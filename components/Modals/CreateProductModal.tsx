"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import axios from "axios";
interface CreateProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => Promise<void>;
  categories: string[];
}

const CreateProductModal: React.FC<CreateProductModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  categories,
}) => {
  const [item_name, setItemName] = useState("");
  const [item_description, setItemDescription] = useState("");
  const [item_price, setItemPrice] = useState({ single: "", combo: "" });
  const [item_category, setItemCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
 
  const handleSubmit = async () => {
    setSubmitting(true)
    const data = new FormData();
    data.append("item_name", item_name);
    data.append("item_description", item_description);
    data.append("item_price_single", item_price.single);
    if (item_price.combo) data.append("item_price_combo", item_price.combo);
    data.append("item_category", item_category);
    if (image) data.append("image", image);

   await onSubmit(data);

    onClose();
    setSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <Dialog.Panel className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
          <Dialog.Title className="text-xl font-bold mb-4"> Create New Product</Dialog.Title>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Item name"
              value={item_name}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />

            <textarea
              placeholder="Item description"
              value={item_description}
              onChange={(e) => setItemDescription(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />

            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Single Price"
                value={item_price.single}
                onChange={(e) => setItemPrice({ ...item_price, single: e.target.value })}
                className="w-1/2 border rounded px-3 py-2"
              />
              <input
                type="number"
                placeholder="Combo Price (optional)"
                value={item_price.combo}
                onChange={(e) => setItemPrice({ ...item_price, combo: e.target.value })}
                className="w-1/2 border rounded px-3 py-2"
              />
            </div>

            <select
              value={item_category}
              onChange={(e) => setItemCategory(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files && setImage(e.target.files[0])}
              className="w-full"
            />
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-KC_GREEN text-white rounded"
              disabled={submitting}
            >
              Create
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default CreateProductModal;

