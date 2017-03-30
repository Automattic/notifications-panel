# Get Makefile directory name: http://stackoverflow.com/a/5982798/376773.
# This is a defensive programming approach to ensure that this Makefile
# works even when invoked with the `-C`/`--directory` option.
THIS_MAKEFILE_PATH:=$(word $(words $(MAKEFILE_LIST)),$(MAKEFILE_LIST))
THIS_DIR:=$(shell cd $(dir $(THIS_MAKEFILE_PATH));pwd)

# BIN directory
BIN := $(THIS_DIR)/../../node_modules/.bin

# applications
NODE ?= node
MOCHA ?= $(NODE) $(BIN)/mocha

test:
	@$(MOCHA) --compilers js:babel/register --reporter spec --ui bdd

.PHONY: test
