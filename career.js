/* ============================================================
   AMBEDKAR SIKHYA — Career Guidance Tool
   Interactive career questionnaire + pathway navigation.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // -- Career Questionnaire --
  const questionnaireForm = document.getElementById('career-questionnaire');
  const resultsContainer = document.getElementById('career-results');

  if (questionnaireForm && resultsContainer) {
    questionnaireForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const level = document.getElementById('education-level').value;
      const interest = document.getElementById('career-interest').value;

      if (!level || !interest) return;

      // Build dynamic guidance based on selection
      const pathways = getPathways(level, interest);

      resultsContainer.innerHTML = `
        <div class="card" style="border: 2px solid var(--color-secondary);">
          <div class="card-body">
            <span class="badge" style="margin-bottom: var(--space-md);">Guidance Result</span>
            <h3 class="card-title" style="font-size:1.25rem;">Recommended Pathways</h3>
            <p class="card-subtitle">Based on: <strong>${level}</strong> completed, interested in <strong>${interest}</strong></p>
            <div class="card-text mt-md">
              ${pathways}
            </div>
            <p style="font-size:0.8rem;color:var(--color-text-light);margin-top:var(--space-lg);border-top:1px solid var(--color-border-light);padding-top:var(--space-md);">This is general guidance for informational purposes. For personalized advice, book a counselling session.</p>
            <div class="btn-group mt-lg">
              <a href="counselling.html" class="btn btn-primary">Talk to a Counsellor</a>
              <a href="career.html" class="btn btn-secondary">Explore More</a>
            </div>
          </div>
        </div>`;
      resultsContainer.classList.remove('hidden');
      resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  // -- Pathway Node Clicks --
  const nodes = document.querySelectorAll('.pathway-node[data-url]');
  nodes.forEach(node => {
    node.addEventListener('click', () => {
      const url = node.dataset.url;
      if (url) window.location.href = url;
    });
  });
});

// Generate pathway suggestions based on level + interest
function getPathways(level, interest) {
  const paths = {
    'Class 10': {
      'Teaching': '<ul><li>Choose +2 with Arts or Science stream</li><li>Complete Graduation (BA/BSc)</li><li>Pursue B.Ed for teaching eligibility</li><li>Prepare for OTET/CTET</li></ul>',
      'Government Jobs': '<ul><li>Complete +2 in any stream</li><li>Complete Graduation</li><li>Start competitive exam preparation</li><li>Consider courses like UPSC, SSC, OPSC</li></ul>',
      'Technology': '<ul><li>Choose +2 Science (PCM)</li><li>Pursue B.Tech / BCA / Diploma in Engineering</li><li>Build practical skills through projects</li></ul>',
      'Healthcare': '<ul><li>Choose +2 Science (PCB)</li><li>Pursue MBBS, BDS, B.Pharm, or Nursing</li><li>Prepare for NEET if applicable</li></ul>',
      'default': '<ul><li>Complete +2 in a stream matching your interests</li><li>Explore Arts, Science, or Commerce</li><li>Consider ITI / Diploma for skill-based careers</li><li>Book a counselling session for personalized advice</li></ul>'
    },
    '+2': {
      'Teaching': '<ul><li>Complete Graduation (BA/BSc/BCom)</li><li>Pursue B.Ed after graduation</li><li>Prepare for teacher eligibility tests</li></ul>',
      'Government Jobs': '<ul><li>Complete Graduation</li><li>Begin competitive exam preparation early</li><li>Consider coaching or self-study resources</li></ul>',
      'Technology': '<ul><li>Pursue B.Tech, BCA, or BSc Computer Science</li><li>Learn programming and practical skills</li><li>Consider internships during graduation</li></ul>',
      'Business': '<ul><li>Pursue BBA, BCom, or related degree</li><li>Consider CA/CMA for accounting careers</li><li>Develop entrepreneurship skills</li></ul>',
      'default': '<ul><li>Explore undergraduate programs in your area of interest</li><li>Consider professional courses</li><li>Start preparing for competitive exams if interested</li><li>Book a counselling session for guidance</li></ul>'
    },
    'Graduation': {
      'Teaching': '<ul><li>Pursue B.Ed (mandatory for school teaching)</li><li>Prepare for OTET/CTET</li><li>Consider M.Ed for higher positions</li></ul>',
      'Government Jobs': '<ul><li>Prepare for UPSC, OPSC, SSC, Banking exams</li><li>Join coaching or use quality self-study resources</li><li>Stay updated with exam notifications</li></ul>',
      'Research': '<ul><li>Pursue Post-Graduation (MA/MSc/MCom)</li><li>Prepare for NET/SET</li><li>Apply for PhD programs</li></ul>',
      'default': '<ul><li>Consider Post-Graduation for specialization</li><li>Explore government and private sector jobs</li><li>Pursue professional courses (MBA, LLB, etc.)</li><li>Book counselling for personalized direction</li></ul>'
    },
    'Post-Graduation': {
      'Teaching': '<ul><li>Prepare for NET/SET for university teaching</li><li>Consider PhD for research positions</li><li>Apply for teaching positions in colleges</li></ul>',
      'Research': '<ul><li>Clear NET/SET for fellowship</li><li>Apply to PhD programs</li><li>Publish research and build academic profile</li></ul>',
      'Government Jobs': '<ul><li>Apply for higher-level government positions</li><li>Prepare for UPSC, state-level services</li><li>Consider specialized roles matching your field</li></ul>',
      'default': '<ul><li>Explore advanced career options in your field</li><li>Consider PhD, professional certifications</li><li>Build industry connections</li><li>Book counselling for specialized guidance</li></ul>'
    }
  };

  const levelPaths = paths[level] || paths['Class 10'];
  return levelPaths[interest] || levelPaths['default'];
}
