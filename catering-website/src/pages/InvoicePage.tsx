import { Link, useParams } from "react-router-dom";
import { getInvoiceById } from "../data/invoiceStorage";
import InvoiceView from "../components/InvoiceView";
import { usePageTitle } from "../hooks/usePageTitle";

export default function InvoicePage() {
  usePageTitle("Invoice");
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const invoice = invoiceId ? getInvoiceById(invoiceId) : undefined;

  if (!invoice) {
    return (
      <div className="bg-white rounded-lg border border-brand-200 p-6 text-center space-y-3">
        <h1 className="text-2xl font-bold text-brand-900">Invoice not found</h1>
        <p className="text-brand-700">We couldn't find that invoice on this device.</p>
        <Link
          to="/"
          className="inline-block px-4 py-2 rounded-md bg-brand-700 text-white font-medium hover:bg-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
        >
          Back to menu
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p role="status" className="text-brand-800 font-medium">
        Thank you! Your order has been placed.
      </p>
      <InvoiceView invoice={invoice} />
    </div>
  );
}
