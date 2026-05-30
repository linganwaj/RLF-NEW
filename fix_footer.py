import glob

replacements = {
    '<li><a href="#">Home</a></li>': '<li><a href="index.html">Home</a></li>',
    '<li><a href="#">Research</a></li>': '<li><a href="research.html">Research</a></li>',
    '<li><a href="#">Values</a></li>': '<li><a href="about.html#our-values">Values</a></li>',
    '<li><a href="#">Make a Donation</a></li>': '<li><a href="donate.html">Make a Donation</a></li>',
    '<li><a href="#">Become a Volunteer</a></li>': '<li><a href="contact.html">Become a Volunteer</a></li>',
    '<li><a href="#">Our Partners</a></li>': '<li><a href="about.html">Our Partners</a></li>',
    '<li><a href="#">Fundraising</a></li>': '<li><a href="donate.html">Fundraising</a></li>',
}

for filepath in glob.glob('*.html'):
    with open(filepath, 'r') as f:
        content = f.read()
    
    new_content = content
    for old, new in replacements.items():
        new_content = new_content.replace(old, new)
        
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated footer in {filepath}")
