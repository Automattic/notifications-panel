# Get Makefile directory name: http://stackoverflow.com/a/5982798/376773.
# This is a defensive programming approach to ensure that this Makefile
# works even when invoked with the `-C`/`--directory` option.
THIS_MAKEFILE_PATH:=$(word $(words $(MAKEFILE_LIST)),$(MAKEFILE_LIST))
THIS_DIR:=$(shell cd $(dir $(THIS_MAKEFILE_PATH));pwd)

# applications
NODE ?= node
NPM ?= $(NODE) $(shell which npm)

CLIENT_FILES := $(wildcard src/*/*.js*)
SASS_FILES := $(wildcard src/*/*.scss) $(wildcard src/boot/stylesheets/*.scss) $(wildcard src/boot/stylesheets/*/*.scss)

# variables
NODE_ENV ?= development
export NODE_ENV := $(NODE_ENV)

# The `run` task is the default rule in the Makefile.
# Simply running `make` by itself will spawn the Node.js server instance.
run:
	@$(NPM) start

# create the build directory
public:
	@mkdir -p public

public/rtl: public
	@mkdir -p public/rtl

public/root.html: public/build.min.js

public/index.html: public/root.html
	@ln -s root.html public/index.html

public/rtl.html: public/rtl public/build.min.js
	@sed -e "s/build.css/rtl\/build-rtl.css/" public/root.html > public/rtl.html

# bundle client-side `*.js` files into the `public/build.min.js` file
public/build.min.js: $(CLIENT_FILES) $(SASS_FILES) public
ifeq ($(NODE_ENV), production)
	@$(NPM) run build:prod
else
	@$(NPM) run build
endif

githooks:
	@if [ ! -e .git/hooks/pre-commit ]; then ln -s ../../bin/pre-commit .git/hooks/pre-commit; fi

# the `make build` rule is just an aggregate of some specific file rules
build: public/index.html public/rtl.html githooks

build-no-githook: public/index.html public/rtl.html

# the `clean` rule deletes all the files created from `make build`
clean:
	@rm -rf public/root.html \
		public/rtl.html \
		public/rtl \
		public/build.css \
		public/build.css.map \
		public/build.min.js \
		public/build.min.js.map \
		public/index.html

# the `distclean` rule deletes all the files created from `make install`
distclean: clean
	@rm -rf node_modules

translate: public/build.min.js
	@$(NPM) run translate

.PHONY: githooks run build clean distclean test translate
