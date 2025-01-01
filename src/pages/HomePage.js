// Add this near your other imports
import { useState } from 'react';
import LearnMoreModal from '../components/LearnMoreModal';

// Inside your HomePage component, add state for modal
const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false);

// Update the Learn More button onClick handler
<button 
  onClick={() => setIsLearnMoreOpen(true)} 
  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
>
  Learn More
</button>

// Add the modal component before the closing div of your component
<LearnMoreModal 
  isOpen={isLearnMoreOpen} 
  onClose={() => setIsLearnMoreOpen(false)} 
/>