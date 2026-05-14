import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CheckoutFormData, CheckoutStep } from '../types';
import { useCart } from '../context/CartContext';
import { generateInvoice, saveInvoice } from '../utils/invoiceUtils';
import PageWrapper from '../components/layout/PageWrapper';
import CheckoutProgress from '../components/checkout/CheckoutProgress';
import PickupInfoStep from '../components/checkout/PickupInfoStep';
import ContactInfoStep from '../components/checkout/ContactInfoStep';
import PaymentMethodStep from '../components/checkout/PaymentMethodStep';
import ReviewStep from '../components/checkout/ReviewStep';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

const STEPS: CheckoutStep[] = ['pickup', 'contact', 'payment', 'review'];

const emptyForm: CheckoutFormData = {
  pickup: { pickupDate: '', pickupTime: '', specialInstructions: '' },
  contact: { firstName: '', lastName: '', email: '', phone: '' },
  paymentMethod: 'cash',
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { state, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('pickup');
  const [formData, setFormData] = useState<CheckoutFormData>({
    ...emptyForm,
    pickup: { ...emptyForm.pickup, pickupDate: state.cateringDate ?? '' },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!state.cateringDate || state.items.length === 0) {
    return (
      <PageWrapper title="Checkout">
        <div className="text-center py-16">
          <p className="text-stone-600 mb-4">Your cart is empty. Browse the menu to add items.</p>
          <Link to="/">
            <Button variant="primary" size="md">Browse Menu</Button>
          </Link>
        </div>
      </PageWrapper>
    );
  }

  const stepIndex = STEPS.indexOf(currentStep);
  const goNext = () => setCurrentStep(STEPS[stepIndex + 1]);
  const goBack = () => setCurrentStep(STEPS[stepIndex - 1]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const invoice = generateInvoice(formData, state);
      saveInvoice(invoice);
      clearCart();
      navigate(`/invoice/${invoice.invoiceId}`);
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <PageWrapper title="Checkout">
      <div className="max-w-xl mx-auto">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-stone-900 mb-4">Checkout</h1>
          <CheckoutProgress currentStep={currentStep} />
        </div>

        {currentStep === 'pickup' && (
          <PickupInfoStep
            data={formData.pickup}
            cateringDate={state.cateringDate}
            onChange={(pickup) => setFormData({ ...formData, pickup })}
            onNext={goNext}
          />
        )}
        {currentStep === 'contact' && (
          <ContactInfoStep
            data={formData.contact}
            onChange={(contact) => setFormData({ ...formData, contact })}
            onNext={goNext}
            onBack={goBack}
          />
        )}
        {currentStep === 'payment' && (
          <PaymentMethodStep
            value={formData.paymentMethod}
            onChange={(paymentMethod) => setFormData({ ...formData, paymentMethod })}
            onNext={goNext}
            onBack={goBack}
          />
        )}
        {currentStep === 'review' && (
          <ReviewStep
            formData={formData}
            onSubmit={handleSubmit}
            onBack={goBack}
            onEdit={(step) => setCurrentStep(step)}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </PageWrapper>
  );
}
