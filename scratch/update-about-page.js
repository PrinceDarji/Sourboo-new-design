const fs = require('fs');
const path = require('path');

const aboutPath = 'c:/Users/user/Downloads/Sourboo/repo/sourboo-final-main/app/about/page.tsx';
let content = fs.readFileSync(aboutPath, 'utf8');

// Normalize line endings
content = content.replace(/\r\n/g, '\n');

// 1. Ensure SectionThreeEyesSequence is imported
if (!content.includes('SectionThreeEyesSequence')) {
  content = content.replace(
    "import AboutTopStrip from '../components/about/AboutTopStrip';",
    "import AboutTopStrip from '../components/about/AboutTopStrip';\nimport SectionThreeEyesSequence from '../components/about/SectionThreeEyesSequence';"
  );
  console.log('Added import for SectionThreeEyesSequence');
}

// 2. Add SectionThreeEyesSequence to Act 4 (The Problem: Sour as a Side Dish)
const problemTarget = '<div className="sb-story-wrap sb-story-problem__grid">';
const problemReplacement = `<div className="sb-story-wrap">
          <div className="sb-story-problem__eyes-row">
            <SectionThreeEyesSequence className="sb-story-problem__eyes" />
          </div>
          <div className="sb-story-problem__grid">`;

if (content.includes(problemTarget)) {
  content = content.replace(problemTarget, problemReplacement);
  console.log('Added eyes to problem section in about/page.tsx');
} else {
  console.log('problemTarget not found in about/page.tsx');
}

fs.writeFileSync(aboutPath, content.replace(/\n/g, '\r\n'), 'utf8');
console.log('Successfully updated app/about/page.tsx');
