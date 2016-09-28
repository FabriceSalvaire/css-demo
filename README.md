This repository contains a [static web site](https://fabricesalvaire.github.io/css-demo) to demonstrate various CSS settings like typography and colours.

This demo follows good design practices like colour contrast.

This work is licensed under [CC by-nc-na](https://creativecommons.org/licenses/by-nc-sa/4.0/) license.

# How to build from scratch

It requires Python3 and the Jinja2 template engine as well as a standard web development stack (NodeJS, Bower). Thus it requires some knowledges on Python and web tools.

To install Jinja2, run basically:

  pip install jinja2

Best it is to look for Python Virtual Environment or a package if your are using Linux.

First install NPM packages:

    npm install

and Bower packages:

    bower install

then run Gulp to generate the site and open it in your browser:

    gulp
