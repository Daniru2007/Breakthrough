import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './Help.css';

const faqs = [
  {
    question: 'How do I reset my progress?',
    answer: 'To reset your progress, go to Settings > Learning Progress > Reset Progress. Please note that this action cannot be undone.',
  },
  {
    question: 'How do streaks work?',
    answer: 'A streak is maintained by completing at least one lesson every day. You can protect your streak by using a Streak Freeze, available in the Shop.',
  },
  {
    question: 'How do I change my learning language?',
    answer: 'You can change your learning language by clicking the flag icon in the top navigation bar and selecting a new language from the dropdown menu.',
  },
  {
    question: 'What are gems and how do I earn them?',
    answer: 'Gems are the virtual currency used in the app. You can earn gems by completing lessons, achieving goals, and maintaining streaks.',
  },
  {
    question: 'How do I report a problem?',
    answer: 'If you encounter any issues, click the "Report a Problem" button at the bottom of this page or contact our support team at support@example.com.',
  },
];

function Help() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="help-container">
      <h1 className="more-title">Help Center</h1>
      
      <div className="help-search">
        <input
          type="text"
          placeholder="Search for help..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="faq-section">
        {filteredFaqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <button
              className="faq-question"
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
            >
              {faq.question}
              {openFaq === index ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>
            {openFaq === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Help;