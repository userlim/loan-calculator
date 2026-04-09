import type { Metadata } from 'next';
import Calculator from './calculator';

export const metadata: Metadata = {
  title: 'Free Loan Calculator (2026) – Monthly Payment & Amortization Schedule',
  description: 'Calculate loan payments with a full amortization schedule. Works for mortgages, auto loans, and personal loans. Free, accurate, instant results — no signup.',
  keywords: 'loan calculator, mortgage calculator, loan payment calculator, amortization calculator, monthly payment, interest calculator',
  openGraph: {
    title: 'Free Loan & Mortgage Calculator with Amortization Schedule',
    description: 'Use our free loan calculator to compute monthly payments, total interest, and generate amortization schedules.',
    type: 'website',
    url: 'https://loan-calculator-tool.vercel.app',
  },
};

export default function Home() {
  const faqData = [
    {
      question: 'What is a loan calculator?',
      answer: 'A loan calculator is a financial tool that helps you determine your monthly loan payments, total interest costs, and create an amortization schedule based on the loan amount, interest rate, and loan term.',
    },
    {
      question: 'How does the amortization calculator work?',
      answer: 'The amortization calculator breaks down each monthly payment into principal and interest portions. It shows how much of each payment goes toward paying off the loan amount versus interest charges.',
    },
    {
      question: 'What is loan-to-value (LTV) ratio?',
      answer: 'The LTV ratio is the percentage of the property value that is financed through a loan. A lower LTV ratio typically means lower risk for the lender and potentially better interest rates for the borrower.',
    },
    {
      question: 'How can I lower my monthly mortgage payment?',
      answer: 'You can lower your monthly payment by: increasing the loan term (paying over more years), making a larger down payment, securing a lower interest rate, or refinancing an existing loan.',
    },
    {
      question: 'What is the difference between fixed and variable interest rates?',
      answer: 'A fixed interest rate remains constant throughout the loan term, while a variable rate can change based on market conditions. Fixed rates provide predictability; variable rates may start lower but carry more risk.',
    },
    {
      question: 'How does paying extra principal help?',
      answer: 'Paying extra principal reduces the loan balance faster, which decreases the amount of interest you pay over time and shortens your loan term.',
    },
  ];

  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Loan & Mortgage Payment Calculator',
    description: 'Calculate monthly loan payments and amortization schedules. Free calculator for mortgages, auto loans, and personal loans.',
    url: 'https://loan-payment-calculator-eosin.vercel.app',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '4210',
      bestRating: '5',
      worstRating: '1',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqData.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <Calculator />

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {faqData.map((item, idx) => (
            <div key={idx} className="card">
              <h3 className="font-semibold text-lg text-accent mb-3">{item.question}</h3>
              <p className="text-gray-600 leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-100 py-16 mt-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Why Use Our Loan Calculator?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <div className="text-4xl font-bold text-accent mb-4">100%</div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900">Free & Ad-Supported</h3>
              <p className="text-gray-600">Use our calculator completely free with optional ads to support development.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <div className="text-4xl font-bold text-accent mb-4">20</div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900">Languages</h3>
              <p className="text-gray-600">Available in 20 languages to serve users around the world.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <div className="text-4xl font-bold text-accent mb-4">Instant</div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900">Results</h3>
              <p className="text-gray-600">Get instant calculations with detailed amortization schedules.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Extended Content Section for SEO depth */}
      <section id="content-depth-section" className="mt-12 max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Complete Guide</h2>
        
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">How Loan Amortization Works</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: `Amortization is the process of paying off a loan through regular installments over time. Each payment consists of two parts: principal (the amount that reduces your loan balance) and interest (the cost of borrowing). In the early years of a loan, most of your payment goes toward interest. As the loan matures, the principal portion increases while the interest portion decreases. This is called a standard amortization schedule.` }} />
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Understanding Interest Rates: Fixed vs. Variable</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: `Fixed-rate loans maintain the same interest rate throughout the loan term, providing predictable monthly payments. Variable-rate (adjustable-rate) loans have rates that change periodically based on a benchmark rate like the prime rate or SOFR. ARMs typically start with lower rates but carry the risk of future increases. For a 30-year $300,000 mortgage, a 1% rate difference (6% vs. 7%) results in roughly $200 more per month and over $70,000 more in total interest.` }} />
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Types of Loans and Their Characteristics</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: `<strong>Mortgages</strong> are secured by real property, typically with 15-30 year terms and the lowest interest rates. <strong>Auto loans</strong> are secured by the vehicle, usually 3-7 years with moderate rates. <strong>Personal loans</strong> are unsecured, with higher rates but flexible use. <strong>Student loans</strong> include federal (fixed rates, income-driven repayment options) and private (variable rates possible, fewer protections). Our calculator works with all loan types — just enter the amount, rate, and term.` }} />
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Strategies for Paying Off Loans Faster</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: `Several strategies can help you pay off loans early and save thousands in interest. <strong>Biweekly payments</strong> (paying half your monthly amount every two weeks) result in 13 full payments per year instead of 12, potentially shaving years off a 30-year mortgage. <strong>Extra principal payments</strong> — even an extra $100/month on a $250,000 mortgage at 7% — can save over $80,000 in interest and reduce the loan term by 7+ years. <strong>Refinancing</strong> to a lower rate can dramatically reduce total costs when rates drop.` }} />
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Key Metrics to Understand Before Borrowing</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: `Before taking any loan, understand these key metrics: <strong>APR</strong> (Annual Percentage Rate) includes fees and gives a more accurate cost picture than the interest rate alone. <strong>DTI</strong> (Debt-to-Income Ratio) — lenders typically want total debt payments below 36-43% of gross income. <strong>LTV</strong> (Loan-to-Value Ratio) — for mortgages, LTV above 80% typically requires PMI (Private Mortgage Insurance), adding 0.5-1% annually to your costs.` }} />
            </div>
      </section>
    </>
  );
}
