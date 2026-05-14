import { useState, useId } from 'react';
import type { FoodItem } from '../types';
import { useCart } from '../context/CartContext';
import { getMenuForDate } from '../data/menus';
import { formatDate } from '../utils/formatUtils';
import PageWrapper from '../components/layout/PageWrapper';
import DatePicker from '../components/menu/DatePicker';
import PortionPicker from '../components/menu/PortionPicker';
import MenuSection from '../components/menu/MenuSection';
import FoodDetailModal from '../components/menu/FoodDetailModal';

export default function MenuPage() {
  const { state, setCateringDate, setPortionSize, itemCount } = useCart();
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const setupId = useId();

  const handleOpenDetail = (item: FoodItem) => {
    setSelectedItem(item);
    setIsDetailOpen(true);
  };

  const menu = state.cateringDate ? getMenuForDate(state.cateringDate) : null;
  const proteinItems = menu?.items.filter((i) => i.category === 'protein') ?? [];
  const vegetarianItems = menu?.items.filter((i) => i.category === 'vegetarian') ?? [];
  const sideItems = menu?.items.filter((i) => i.category === 'side') ?? [];

  const showMenu = !!state.cateringDate;

  return (
    <PageWrapper title="Menu">
      {/* Hero */}
      <div className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 mb-2">
          Our Weekly Menu
        </h1>
        <p className="text-stone-500 max-w-xl">
          Every day of the week features a unique cuisine. Choose your catering date and portion size to get started.
        </p>
      </div>

      {/* Setup panel */}
      <div
        className="bg-white rounded-2xl border border-amber-100 shadow-sm p-6 mb-10"
        aria-label="Order setup"
        id={setupId}
      >
        <h2 className="font-semibold text-stone-900 text-base mb-5 flex items-center gap-2">
          <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded-full">Step 1</span>
          Choose Your Date &amp; Portion Size
        </h2>
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm font-medium text-stone-700 mb-3">
              Catering Date
              {state.cateringDate && (
                <span className="ml-2 text-amber-700 font-semibold">
                  — {formatDate(state.cateringDate)}
                </span>
              )}
            </p>
            <DatePicker
              value={state.cateringDate}
              onChange={setCateringDate}
              hasCartItems={itemCount > 0}
            />
          </div>

          {state.cateringDate && (
            <div className="border-t border-stone-100 pt-4">
              <PortionPicker value={state.portionSize} onChange={setPortionSize} />
            </div>
          )}
        </div>

        {state.cateringDate && !state.portionSize && (
          <p
            className="mt-4 text-sm text-amber-700 bg-amber-50 rounded-lg px-4 py-3 flex items-center gap-2"
            role="alert"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Please select a portion size to enable adding items to your cart.
          </p>
        )}
      </div>

      {/* Menu */}
      {showMenu ? (
        <section aria-label="Today's menu">
          <div className="flex items-baseline gap-3 mb-6">
            <h2 className="font-display text-2xl font-bold text-stone-900">
              {state.cateringDate
                ? new Date(
                    ...state.cateringDate.split('-').map(Number) as [number, number, number]
                  ).toLocaleDateString('en-CA', { weekday: 'long' }) + "'s Menu"
                : 'Menu'}
            </h2>
            <span className="text-sm text-stone-500">10 dishes</span>
          </div>

          <MenuSection
            category="protein"
            items={proteinItems}
            onOpenDetail={handleOpenDetail}
            sectionId="protein"
          />
          <MenuSection
            category="vegetarian"
            items={vegetarianItems}
            onOpenDetail={handleOpenDetail}
            sectionId="vegetarian"
          />
          <MenuSection
            category="side"
            items={sideItems}
            onOpenDetail={handleOpenDetail}
            sectionId="sides"
          />
        </section>
      ) : (
        <div
          className="text-center py-16 text-stone-400"
          aria-live="polite"
          aria-label="Menu not yet visible"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-stone-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-lg font-medium text-stone-500">Select a catering date above to view the menu</p>
          <p className="text-sm mt-1">Orders must be placed at least 2 days in advance.</p>
        </div>
      )}

      <FoodDetailModal
        item={selectedItem}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
    </PageWrapper>
  );
}
