import type { Metadata } from 'next';
import Calculator from './calculator';

export const metadata: Metadata = {
  title: 'Free Loan & Mortgage Calculator with Amortization Schedule',
  description: 'Use our free loan calculator to compute monthly payments, total interest, and generate amortization schedules. Perfect for mortgages, auto loans, personal loans, and student loans.',
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
    </>
  );
}
