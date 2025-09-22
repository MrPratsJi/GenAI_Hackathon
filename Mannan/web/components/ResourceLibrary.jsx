import React from 'react';

const resources = [
  { type: 'Article', title: 'Understanding Exam Stress', url: 'https://www.mind.org.uk/information-support/types-of-mental-health-problems/stress/' },
  { type: 'Video', title: 'Box Breathing Technique', url: 'https://www.youtube.com/watch?v=tEmt1Znux58' },
  { type: 'Helpline', title: 'iCALL Youth Helpline', url: 'https://icallhelpline.org/' },
];

export default function ResourceLibrary() {
  return (
    <div className="glass card" style={{marginTop:24}}>
      <h3 className="gradient-text">Resource Library</h3>
      <ul style={{paddingLeft:18}}>
        {resources.map((r, i) => (
          <li key={i}>
            <b>{r.type}:</b> <a href={r.url} target="_blank" rel="noopener noreferrer">{r.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
