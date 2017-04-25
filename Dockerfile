FROM       node:6.9.2

MAINTAINER Automattic

WORKDIR    /notifications

ADD        . /notifications

ENV        NODE_ENV production

RUN        true && \
           make distclean && \
           make clean && \
           npm cache clean && \
           npm install && \
           make build && \
           true

CMD        make run
