// File: js/routes/blog/6-measuring-traffic-in-dynamodb.js

import { REMIX, AWS } from './tags.js';
import postNav from '../../components/post-nav.js';
import blogSubscribe from '../../components/blog-subscribe.js';
import shareButtons from '../../components/share-buttons.js';
import updateMeta from '../../components/update-meta.js';
import canonicalUrl from '../../utils/canonicalUrl.js';

export const date = new Date('2025-07-29');
export const dateText = date.toLocaleDateString(undefined, {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
export const author = 'Nikos Katsikanis';
export const tags = [REMIX, AWS];

export const content = `
  <style>
    .img-wrap {
      float: left;
      margin: 0 1.5rem 1rem 0;
      width: 160px;
      height: 160px;
      overflow: hidden;
      border-radius: 50%;
      shape-outside: circle();
      -webkit-shape-outside: circle();
    }

    .img-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    pre {
      max-width: 800px;
      margin: 1rem auto;
      padding: 1rem;
      overflow: auto;
      background-color: var(--code-background, #f8f8f8);
      border-radius: 0.5rem;
    }
  </style>

  <!-- Post header -->
  <h1 class="blog-title">Measuring Traffic in DynamoDB and Detecting Abuse</h1>
  <p class="minor">${author} - ${dateText}</p>

  <div class="img-wrap">
    <img src="/img/nikos.jpg" alt="Nikos Katsikanis" />
  </div>

  <div class="preview">
    <p>This post shows how a Remix app on AWS logs every request in DynamoDB. We roll up the numbers each day and week to keep costs down and catch bad actors.</p>
  </div>

  <h2>Capturing Events</h2>
  <p>Every page view, login and other action creates a metric containing the event name, timestamp, optional user information and the caller&rsquo;s IP address. The app uses Architect with Remix so each write happens inside a short-lived Lambda running on AWS. All data is written using a lightweight DynamoDB helper.</p>
  <p>Each metric item is immutable and stored in a single table alongside a flag indicating whether it has been aggregated. This single-table approach keeps writes simple and follows common NoSQL guidance to store data in the shape you need to read it.</p>
  <pre><code class="language-ts">export enum MetricEvent {
  Authenticate = 'authenticate',
  VisitComePage = 'visitSomePage',
  DoSomeAction = 'doSomeAction',
  // ... etc
}
export type Metric = {
  id: string;
  event: MetricEvent;
  timestamp: string;
  userId: string | null;
  ip: string | null;
  aggregated: boolean;
  metadata?: Record&lt;string, unknown&gt;;
};</code></pre>
  <p>Metrics are recorded through a helper function:</p>
  <pre><code class="language-ts">export const recordMetric = async (
  event: MetricEvent,
  userId: string | null,
  metadata?: Record&lt;string, unknown&gt;,
  ip?: string | null,
  userAgent?: string | null,
): Promise&lt;void&gt; => {
  const metric: Metric = {
    id: '',
    event,
    timestamp: new Date().toISOString(),
    userId,
    ip: ip ?? null,
    aggregated: false,
  };
  await setMetric(metric);
};</code></pre>

  <h2>Aggregating Daily Metrics</h2>
  <p>A nightly Lambda scans the previous day&rsquo;s metrics using a date prefix on the sort key. It sums up the counts for each event and stores the results in a separate daily table along with a rough read cost estimate. Once processed, the original records are flagged so they won&rsquo;t be picked up again.</p>
  <p>This pattern of writing summary items avoids large table scans later and is a practical example of preparing data for the exact queries you need.</p>
  <pre><code class="language-ts">const result = await searchMetric({
  term: date,
  type: 'text',
  compare: 'begin',
  category: 'default',
  pageSize: 1000,
});
const stats = aggregateMetrics(metrics);
const costEstimate = parseFloat(((totalScanned / 1_000_000) * 1.25).toFixed(4));
await setMetricDaily({ id: date, date, stats, costEstimate });</code></pre>

  <h2>Computing Cost Savings and Detecting Abuse</h2>
  <p>An aggregation script merges all the daily summaries. It calculates how many reads the rollup process saved compared with scanning every raw event. The same pass groups metrics by IP address and flags bursts of activity that fire faster than a human could click. Those IPs are considered suspicious for further review.</p>
  <pre><code class="language-ts">const unaggregatedCost = parseFloat(((totalEvents / 1_000_000) * 1.25).toFixed(4));
const queryCost = parseFloat(((result.stats.scanned / 1_000_000) * 1.25).toFixed(4));
merged.totalSaved = parseFloat((unaggregatedCost - (totalCost + queryCost)).toFixed(4));

const item = {
  ip,
  count: info.count,
  userId: info.userId,
  avgDuration: avg,
  suspicious: info.count > 20 && avg < 1000,
};</code></pre>

  <h2>Weekly IP Aggregation</h2>
  <p>Once a week a separate process gathers seven days of metrics. It groups them by geographic location and IP address, storing only the top results. This makes it easy to spot accounts that appear to share the same IP across different regions.</p>
  <pre><code class="language-ts">for (let i = 0; i < 7; i++) {
  const result = await searchMetric({ term: dateStr, ... });
  metrics.push(...result.items.filter((m) => m.timestamp.startsWith(dateStr)));
}
const topIpsByLocation = await aggregateIps(metrics);
const costEstimate = parseFloat(((totalScanned / 1_000_000) * 1.25).toFixed(4));
await setMetricWeekly({ id: weekId, week: weekId, topIpsByLocation, costEstimate });</code></pre>

  <h2>Visualizing in the Admin UI</h2>
  <p>The admin dashboard charts each metric type and lists any flagged IPs. It also shows the estimated DynamoDB cost per day so administrators can see how much the rollups save compared to scanning raw events.</p>
  <pre><code class="language-ts">&lt;DailyEventChart labels={costLabels} counts={costValues} datasetLabel="Cost ($)" /&gt;
&lt;p class="text-sm text-gray-600 mt-1"&gt;
  Total cost so far: \${totalCost.toFixed(4)} – Saved approx. \${totalSaved.toFixed(4)}
&lt;/p&gt;</code></pre>


  <h2>Conclusion</h2>
  <p>Summarizing metrics every day and week keeps DynamoDB costs predictable and surfaces unusual traffic quickly. Storing immutable events and writing precomputed summaries exemplifies a NoSQL mindset&mdash;design tables around your access patterns and avoid expensive queries.</p>

  <div data-component="discuss"></div>
`;

export default (hostComponent) => {
  hostComponent.innerHTML = content;
  const ensureHighlight = () => {
    if (window.hljs) {
      window.hljs.highlightAll();
      return;
    }

    const createLink = (href, media) => {
      const l = document.createElement('link');
      l.rel = 'stylesheet';
      l.href = href;
      if (media) l.media = media;
      document.head.appendChild(l);
    };

    createLink(
      'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css',
      '(prefers-color-scheme: light)',
    );
    createLink(
      'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css',
      '(prefers-color-scheme: dark)',
    );

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js';
    script.onload = () => window.hljs.highlightAll();
    document.head.appendChild(script);
  };
  ensureHighlight();
  const discuss = hostComponent.querySelector('div[data-component="discuss"]');
  hostComponent.insertBefore(shareButtons('Measuring Traffic in DynamoDB and Detecting Abuse'), discuss);
  hostComponent.insertBefore(postNav('/blog/6-measuring-traffic-in-dynamodb'), discuss);
  blogSubscribe(hostComponent);
  const firstImg = hostComponent.querySelector('img')?.src || new URL('/img/nikos.jpg', location.origin).href;
  const previewText =
    hostComponent.querySelector('.preview')?.textContent.trim().split(/\s+/).slice(0, 30).join(' ') || '';
  updateMeta({
    title: 'Measuring Traffic in DynamoDB and Detecting Abuse',
    description: previewText,
    image: firstImg,
    url: canonicalUrl(),
    author,
  });
};
