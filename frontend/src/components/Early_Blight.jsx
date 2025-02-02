import React from 'react'
import early from './data/early.json';
import  "./Early_Blight.css"

const Early_Blight = () => {

  const solutions = [
    {
      name: "Chlorothalonil (Bravo)",
      usage: [
        "Mix 1.5–2.0 liters of fungicide in 200–300 liters of water per acre.",
        "Spray thoroughly on all plant surfaces, especially the lower leaves.",
        "Reapply every 7–10 days or after heavy rain."
      ]
    },
    {
      name: "Mancozeb (Dithane M-45)",
      usage: [
        "Mix 2.0–2.5 kg of fungicide in 200–300 liters of water per acre.",
        "Apply preventively or at the first sign of Early Blight symptoms.",
        "Repeat every 10–14 days for continuous protection."
      ]
    },
    {
      name: "Azoxystrobin (Quadris)",
      usage: [
        "Mix the recommended dose (refer to label) in sufficient water for even coverage.",
        "Spray evenly, covering both upper and lower leaf surfaces.",
        "Use preventively to inhibit fungal spore development."
      ]
    },
    {
      name: "Copper-Based Fungicides",
      usage: [
        "Mix according to the label (e.g., 1.5–2.0 kg in 200 liters of water).",
        "Apply under dry conditions to prevent residue buildup.",
        "Reapply every 7–10 days for consistent protection."
      ]
    }
  ];

  // 




  return (
    <div className="solution-container" id='early'>
      <h1>Early Blight Management</h1>
      <div> <img src={`/assets/${early.imgSrc}`} alt="" /> </div>

      {/* Necessary Steps Section */}
      <section className="steps-section">
        <h2>Necessary Steps to Manage Early Blight</h2>
        <ol>
          <li>Inspect crops regularly for brown spots with concentric rings.</li>
          <li>Remove infected leaves to prevent the spread of disease.</li>
          <li>Improve air circulation by spacing plants properly and removing weeds.</li>
          <li>Water plants carefully using drip irrigation to avoid wet leaves.</li>
          <li>Apply fungicides promptly at the first sign of disease.</li>
        </ol>
      </section>

      {/* Medicines Section */}
      <section className="medicine-section">
        <h2>Recommended Fungicides</h2>
        <ul>
          <li>Chlorothalonil (Bravo)</li>
          <li>Mancozeb (Dithane M-45)</li>
          <li>Azoxystrobin (Quadris)</li>
          <li>Copper-Based Fungicides (e.g., Bordeaux Mixture)</li>
        </ul>
      </section>

      {/* How to Use Section */}
      <section className="usage-section">
        <h2>How to Use the Fungicides</h2>
        {solutions.map((solution, index) => (
          <div className="solution-card" key={index}>
            <h2>{solution.name}</h2>
            <ol>
              {solution.usage.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Early_Blight