#! /usr/bin/env python3

####################################################################################################

from jinja2 import Environment, FileSystemLoader

import os

####################################################################################################

environment = Environment(loader = FileSystemLoader('templates', followlinks=True))

pages = (
    'typography.html',
    'color.html',
)

for page in pages:
    template = environment.get_template(page)
    with open(os.path.join('html', page), 'w') as f:
        f.write(template.render())

