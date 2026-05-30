import re

with open('index.html', 'r') as f:
    content = f.read()

cta_match = re.search(r'    <!-- Mobile Clinic CTA Section -->\n    <section id="mobile-clinic-cta".*?</section>\n', content, re.DOTALL)
programs_match = re.search(r'    <!-- Programs Section - Redesigned -->\n    <section id="programs".*?</section>\n', content, re.DOTALL)

if cta_match and programs_match:
    cta_str = cta_match.group(0)
    prog_str = programs_match.group(0)
    
    # We want the order to be Programs, then CTA.
    new_content = content.replace(cta_str, '')
    new_content = new_content.replace(prog_str, prog_str + '\n' + cta_str)
    
    with open('index.html', 'w') as f:
        f.write(new_content)
    print("Successfully swapped sections.")
else:
    print("Could not match sections.")
