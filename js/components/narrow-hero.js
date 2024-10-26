// Updated narrow-hero component to maintain padding and a fixed height

export default (hostComponent) => {
    const { header = "Default Header", text = "" } = hostComponent.dataset;

    const render = () => {
        hostComponent.innerHTML = `
      <style>
        .narrow-hero {
          position: relative;
          width: 100%;
          height: 250px; 
          background: url('https://picsum.photos/1600/900') center/cover no-repeat;
        }
        
        .narrow-hero-overlay {
          position: absolute;
          inset: 0;
          /*
          background-color: rgba(255, 255, 255, 0.7);
          */
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }
        
        .narrow-hero-content {
          text-align: center;
          max-width: 600px;
          margin: auto;
          padding: 20px; 
          background: rgba(255, 255, 255, 0.7);
        }
        
        .narrow-hero h1 {
          font-size: 2rem;
          margin: 0;
          color: #333;
        }
        
        .narrow-hero p {
          font-size: 1rem;
          color: #555;
        }
      </style>

      <section class="narrow-hero">
        <div class="narrow-hero-overlay">
          <div class="narrow-hero-content">
            <h1>${header}</h1>
            <p>${text}</p>
          </div>
        </div>
      </section>
    `;
    };

    render();
};
