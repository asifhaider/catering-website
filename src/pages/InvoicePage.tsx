import { useParams, Link } from 'react-router-dom';
import { getInvoice } from '../utils/invoiceUtils';
import PageWrapper from '../components/layout/PageWrapper';
import InvoiceView from '../components/invoice/InvoiceView';
import Button from '../components/ui/Button';

export default function InvoicePage() {
  const { id } = useParams<{ id: string }>();
  const invoice = id ? getInvoice(id) : null;

  if (!invoice) {
    return (
      <PageWrapper title="Invoice Not Found">
        <div className="text-center py-16">
          <p className="text-3xl mb-4" aria-hidden="true">🔍</p>
          <h1 className="text-2xl font-bold text-stone-900 mb-2">Invoice Not Found</h1>
          <p className="text-stone-500 mb-6">
            We couldn't find an invoice with that ID. It may have been cleared from your browser.
          </p>
          <Link to="/">
            <Button variant="primary" size="md">Back to Menu</Button>
          </Link>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title="Order Confirmation">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-sage-100 rounded-full mb-4" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="font-display text-3xl font-bold text-stone-900 mb-2">Order Confirmed!</h1>
        <p className="text-stone-500 max-w-md mx-auto">
          Your order has been received. Here's your invoice — please save or print it for your records.
        </p>
      </div>

      <InvoiceView invoice={invoice} />

      <div className="text-center mt-8 no-print">
        <Link to="/">
          <Button variant="outline" size="md">Place Another Order</Button>
        </Link>
      </div>
    </PageWrapper>
  );
}
