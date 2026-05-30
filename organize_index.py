import re

with open('index.html', 'r') as f:
    content = f.read()

# We want to extract "Cross-Cutting Support Pillars" and "Budget Transparency" 
# out of the #programs section and put them in their own <section> tags.

pillars_match = re.search(r'(<!-- Cross-Cutting Support Pillars -->\s*<div class="mt-5 pt-3" data-aos="fade-up" data-aos-delay="300">.*?</div>\s*</div>\s*</div>)', content, re.DOTALL)
budget_match = re.search(r'(<!-- Budget Transparency -->\s*<div class="programs-budget mt-5 pt-3" data-aos="fade-up" data-aos-delay="400">.*?</p>\s*</div>)', content, re.DOTALL)

if pillars_match and budget_match:
    pillars_str = pillars_match.group(1)
    budget_str = budget_match.group(1)
    
    # Remove them from their current location
    new_content = content.replace(pillars_str, '')
    new_content = new_content.replace(budget_str, '')
    
    # Wrap them in <section> tags
    pillars_section = f'''
    <!-- Pillars Section -->
    <section id="pillars" class="pillars section">
      <div class="container">
{pillars_str}
      </div>
    </section>
    '''
    
    budget_section = f'''
    <!-- Budget Section -->
    <section id="budget" class="budget section light-background">
      <div class="container">
{budget_str}
      </div>
    </section>
    '''
    
    # Clean up the div structure for pillars_str and budget_str
    # pillars_str starts with <div class="mt-5 pt-3"...>. We can just remove the mt-5 pt-3 if it's the start of the section.
    pillars_section = pillars_section.replace('class="mt-5 pt-3"', 'class=""')
    budget_section = budget_section.replace('class="programs-budget mt-5 pt-3"', 'class="programs-budget"')
    
    # Where to insert? Right after the closing </section> of #programs
    programs_end_match = re.search(r'(    </section>\n\n    <!-- Mobile Clinic CTA Section -->)', new_content)
    if programs_end_match:
        insert_point = programs_end_match.group(1)
        new_content = new_content.replace(insert_point, f'    </section>\n{pillars_section}\n{budget_section}\n\n    <!-- Mobile Clinic CTA Section -->')
        
        with open('index.html', 'w') as f:
            f.write(new_content)
        print("Successfully reorganized index.html")
    else:
        print("Could not find insertion point")
else:
    print("Could not match pillars or budget")
