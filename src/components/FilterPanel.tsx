
import React from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface PriceRange {
  min: number;
  max: number;
}

interface FilterPanelProps {
  categories: FilterOption[];
  selectedCategories: string[];
  priceRange: PriceRange;
  onCategoryChange: (categoryId: string) => void;
  onPriceRangeChange: (range: PriceRange) => void;
  onClearFilters: () => void;
  className?: string;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  categories,
  selectedCategories,
  priceRange,
  onCategoryChange,
  onPriceRangeChange,
  onClearFilters,
  className = ""
}) => {
  const activeFiltersCount = selectedCategories.length + (priceRange.min > 0 || priceRange.max < 1000000 ? 1 : 0);

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount}
              </Badge>
            )}
          </CardTitle>
          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="sm" onClick={onClearFilters}>
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Active Filters:</h4>
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map(categoryId => {
                const category = categories.find(c => c.id === categoryId);
                return category ? (
                  <Badge key={categoryId} variant="outline" className="flex items-center gap-1">
                    {category.label}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => onCategoryChange(categoryId)}
                    />
                  </Badge>
                ) : null;
              })}
              {(priceRange.min > 0 || priceRange.max < 1000000) && (
                <Badge variant="outline" className="flex items-center gap-1">
                  ${priceRange.min.toLocaleString()} - ${priceRange.max.toLocaleString()}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => onPriceRangeChange({ min: 0, max: 1000000 })}
                  />
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Horizontal Layout for Categories and Price Range */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Categories */}
          <div className="flex-1 space-y-3">
            <h4 className="text-sm font-medium">Categories</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
              {categories.map(category => (
                <label key={category.id} className="flex items-center space-x-2 cursor-pointer p-2 rounded hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => onCategoryChange(category.id)}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-sm truncate block">{category.label}</span>
                    {category.count !== undefined && (
                      <span className="text-xs text-gray-500">({category.count})</span>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="lg:w-64 space-y-3">
            <h4 className="text-sm font-medium">Price Range</h4>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min || ''}
                onChange={(e) => onPriceRangeChange({ ...priceRange, min: Number(e.target.value) || 0 })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary focus:border-primary outline-none"
              />
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max === 1000000 ? '' : priceRange.max}
                onChange={(e) => onPriceRangeChange({ ...priceRange, max: Number(e.target.value) || 1000000 })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary focus:border-primary outline-none"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterPanel;
