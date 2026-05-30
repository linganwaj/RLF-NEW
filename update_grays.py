import re

with open('assets/css/main.css', 'r') as f:
    css = f.read()

# Replace main theme grays with #1a2542
grays_to_replace = [
    '#2c3e50', # default text color
    '#1a252f', # heading color
    '#6a6a6a', # nav color
    '#465367', # nav hover color
    '#1F2937', # tailwind gray-800 used in mobile nav
    '#64748b', # slate-500 used for subtitles/icons
]

for gray in grays_to_replace:
    css = css.replace(gray, '#1a2542')
    css = css.replace(gray.upper(), '#1a2542')

with open('assets/css/main.css', 'w') as f:
    f.write(css)

print("Replaced all grays with #1a2542 in main.css")
