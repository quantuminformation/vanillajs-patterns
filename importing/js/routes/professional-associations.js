export default (hostComponent) => {
  hostComponent.innerHTML = `
    <style>
      .pro-container {
        max-width: 900px;
        margin: 0 auto;
        padding: 2rem 1.5rem;
        font-family: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        line-height: 1.6;
      }

      .pro-container h1 {
        margin: 0 0 1rem;
        font-size: 2rem;
        font-weight: 600;
      }

      .pro-container a {
        color: #2b6cb0;
      }

      @media (prefers-color-scheme: dark) {
        .pro-container a {
          color: #63b3ed;
        }
      }

      .testimonial {
        margin-top: 2.5rem;
        display: flex;
        gap: 1.5rem;
        align-items: flex-start;
        padding: 1.5rem;
        border-radius: 0.75rem;
        background: rgba(0, 0, 0, 0.05);
      }

      @media (prefers-color-scheme: dark) {
        .testimonial {
          background: rgba(255, 255, 255, 0.08);
        }
      }

      .testimonial img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        object-fit: cover;
        flex-shrink: 0;
      }

      blockquote {
        margin: 0;
        font-style: italic;
        position: relative;
      }

      blockquote::before {
        content: "“";
        position: absolute;
        left: -0.65rem;
        top: -0.5rem;
        font-size: 3rem;
        line-height: 1;
        opacity: 0.25;
      }

      blockquote::after {
        content: "”";
        position: absolute;
        right: -0.65rem;
        bottom: -0.5rem;
        font-size: 3rem;
        line-height: 1;
        opacity: 0.25;
      }

      .citation {
        margin-top: 1rem;
        font-weight: 600;
      }

      @media (max-width: 640px) {
        .testimonial {
          flex-direction: column;
          text-align: center;
        }

        .testimonial img {
          margin: 0 auto;
        }

        blockquote::before,
        blockquote::after {
          display: none;
        }
      }
    </style>

    <div class="pro-container">
      <section>
        <h1>Professional Associations</h1>
        <p>
          I help military professional associations modernize their online presence.
          My flagship client is
          <a href="https://agcra.com/" target="_blank" rel="noopener">AGCRA</a>, and I tailor membership
          tools, marketing, and events to organizations with similar missions.
        </p>
        <p>
          Using Remix, AWS, and TypeScript, I deliver secure and scalable solutions, while my relationships
          with the NEC keep projects aligned with each association's goals.
        </p>
      </section>

      <section class="testimonial">
        <img src="https://placehold.co/160x160" alt="Bob Ortiz" />
        <div>
          <blockquote>
            As a former senior official at a nonprofit organization, Nikos Katsikanis remains the
            organization's premier IT professional. Nikos is an IT expert who is very responsive, ensuring
            that the myriad non-profit missions are supported with an exemplary IT system. Nikos provides
            outstanding support for the automation backbone of the organization, which includes the
            nonprofit's website, membership database, scholarship program, mentorship program, event
            ticketing execution &amp; management, IT infrastructure coding, and blog creation &amp; support.
            Nikos is definitely the one you want to take on building social networks within your
            organization.
          </blockquote>
          <p class="citation">COL (Ret) Bob Ortiz, former Senior VP, AGCRA</p>
        </div>
      </section>
    </div>
  `;
};
