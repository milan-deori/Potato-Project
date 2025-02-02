import React from 'react'
import "./Late_Blight.css";
import late from './data/early.json';

const Late_Blight = () => {

  const solutions = [
    {
      name: "Metalaxyl-M (Ridomil Gold)",
      usage: [
        "Mix 2.5 grams of fungicide per liter of water.",
        "Spray thoroughly on all plant surfaces, focusing on affected areas.",
        "Reapply every 10–14 days during high-risk periods."
      ],
    },
    {
      name: "Cymoxanil (Curzate)",
      usage: [
        "Mix 2.0 grams per liter of water as per the label instructions.",
        "Apply preventively or at the first sign of disease.",
        "Repeat application every 7–10 days to maintain control."
      ],
    },
    {
      name: "Copper Oxychloride",
      usage: [
        "Prepare a solution with 3.0 grams per liter of water.",
        "Spray under dry conditions to avoid residue runoff.",
        "Reapply after rainfall for consistent protection."
      ],
    },
    {
      name: "Propamocarb (Previcur)",
      usage: [
        "Dilute the fungicide according to the label (e.g., 3.0 ml per liter of water).",
        "Spray evenly over all foliage, covering lower leaves thoroughly.",
        "Repeat treatment every 10–12 days during wet weather."
      ],
    },
  ];






  return (
    <div className="solution-container">
      <h1>Late Blight Management</h1>
      <div> <img src={`/assets/${late.imgSrc}`} alt="" /> </div>

      {/* Necessary Steps Section */}
      <section className="steps-section">
        <h2>Necessary Steps to Manage Late Blight</h2>
        <ol>
          <li>Monitor crops frequently for dark, water-soaked spots on leaves and stems.</li>
          <li>Remove and destroy infected plant parts immediately.</li>
          <li>Avoid overhead irrigation; use drip irrigation to keep leaves dry.</li>
          <li>Apply fungicides preventively or at the first sign of disease.</li>
          <li>Ensure good air circulation by spacing plants and removing weeds.</li>
        </ol>
      </section>

      {/* Medicines Section */}
      <section className="medicine-section">
        <h2>Recommended Fungicides</h2>
        <ul>
          <li>Metalaxyl-M (Ridomil Gold)</li>
          <li>Cymoxanil (Curzate)</li>
          <li>Copper Oxychloride</li>
          <li>Propamocarb (Previcur)</li>
        </ul>
      </section>

      {/* How to Use Section */}
      <section className="usage-section">
        <h2>How to Use the Fungicides</h2>
        {solutions.map((solution, index) => (
          <div className="solution-card" key={index}>
            <h3>{solution.name}</h3>
            <ol>
              {solution.usage.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Late_Blight