import re

with open('index.html', 'r') as f:
    content = f.read()

# I will extract everything cleanly by replacing the broken parts.
# 1. Clean up lines 346 to 401
content = re.sub(
    r'\n        </div>\n\n        \n        </div>\n\n        \n          <div class="budget-bars">.*?targeting high-impact interventions across 60\+ communities in Rwanda\.</p>\n        </div>\n\n    </section>',
    '\n      </div>\n    </section>',
    content,
    flags=re.DOTALL
)

# 2. Add the budget-bars into the #budget section
budget_bars = """          <div class="budget-bars">
            <div class="budget-bar-item" data-aos="fade-right" data-aos-delay="100">
              <div class="budget-bar-label">
                <span>Women's Health &amp; Empowerment <em>(Ishami ry'Urugo)</em></span>
                <strong>$262,000</strong>
              </div>
              <div class="budget-bar-track">
                <div class="budget-bar-fill animate-bar" style="--bar-width: 25.9%; background: #1a2542;"></div>
              </div>
            </div>
            <div class="budget-bar-item" data-aos="fade-right" data-aos-delay="150">
              <div class="budget-bar-label">
                <span>NCDs &amp; Preventive Screening <em>(Amagara n'Igicumbi)</em></span>
                <strong>$250,000</strong>
              </div>
              <div class="budget-bar-track">
                <div class="budget-bar-fill animate-bar" style="--bar-width: 24.7%; background: #2d5a27;"></div>
              </div>
            </div>
            <div class="budget-bar-item" data-aos="fade-right" data-aos-delay="200">
              <div class="budget-bar-label">
                <span>Children's Foundation <em>(Amagara n'Igicumbi)</em></span>
                <strong>$224,000</strong>
              </div>
              <div class="budget-bar-track">
                <div class="budget-bar-fill animate-bar" style="--bar-width: 22.2%; background: #64af46;"></div>
              </div>
            </div>
            <div class="budget-bar-item" data-aos="fade-right" data-aos-delay="250">
              <div class="budget-bar-label">
                <span>Community Development &amp; Advocacy</span>
                <strong>$163,000</strong>
              </div>
              <div class="budget-bar-track">
                <div class="budget-bar-fill animate-bar" style="--bar-width: 16.1%; background: #1a3a5f;"></div>
              </div>
            </div>
            <div class="budget-bar-item" data-aos="fade-right" data-aos-delay="300">
              <div class="budget-bar-label">
                <span>Health Literacy &amp; Digital Tools</span>
                <strong>$112,000</strong>
              </div>
              <div class="budget-bar-track">
                <div class="budget-bar-fill animate-bar" style="--bar-width: 11.1%; background: #7ed957;"></div>
              </div>
            </div>
          </div>
          <p class="text-center small text-muted mt-4">Allocations are grounded in the Strategic Plan 2023–2027,
            targeting high-impact interventions across 60+ communities in Rwanda.</p>
        </div>
      </div>
    </section>"""

content = re.sub(
    r'(<div class="text-center mb-4">\s*<span class="section-subtitle">Financial Transparency</span>.*?</div>)\n      </div>\n    </section>',
    r'\1\n' + budget_bars,
    content,
    flags=re.DOTALL
)

with open('index.html', 'w') as f:
    f.write(content)

print("Fixed index.html")
