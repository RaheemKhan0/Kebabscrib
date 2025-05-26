"use client";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Menu } from "@components/Menu/MenuList";
import Image from "next/image";
import axios from "axios";

interface EditProductModalProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => Promise<void>;
  categories: string[];
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  id,
  isOpen,
  onClose,
  onSubmit,
  categories,
}) => {
  const [loading, setLoading] = useState(true);
  const [editItem, setEditItem] = useState<Menu | null>(null);
  const [item_name, setItemName] = useState("");
  const [item_description, setItemDescription] = useState("");
  const [item_price, setItemPrice] = useState({ single: "", meal: "" });
  const [item_category, setItemCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchItem = async (id: string) => {
      setLoading(true);
      try {
        const res = await axios.post("/api/admin/getitem", { id });
        if (res.status === 200) {
          const fetched = res.data.item;
          setEditItem(fetched);
          setItemName(fetched.item_name);
          setItemDescription(fetched.item_description);
          setItemPrice({
            single: fetched.item_price.single.toString(),
            meal: fetched.item_price.meal?.toString() || "",
          });
          setItemCategory(fetched.item_category);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        throw error;
      }
    };
    if (id && isOpen) {
      fetchItem(id);
    }
  }, [id, isOpen]);

  const handleSubmit = async () => {
    const data = new FormData();
    if (
      !item_name ||
      !item_description ||
      !item_price.single ||
      !item_category
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    data.append("id", id);
    data.append("item_name", item_name);
    data.append("item_description", item_description);
    data.append("item_price_single", item_price.single);
    if (item_price.meal) data.append("item_price_combo", item_price.meal);
    data.append("item_category", item_category);
    if (image) data.append("image", image);
    setSubmitting(true);

    await onSubmit(data);
    onClose();
    setSubmitting(false);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed z-50 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen px-4">
        <Dialog.Panel className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
          {loading || submitting ? (
            <div className="flex flex-col items-center justify-center py-12">
              <svg
                aria-hidden="true"
                className="inline w-10 h-10 text-gray-200 animate-spin fill-KC_GREEN mb-4"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <p className="text-KC_GREEN font-semibold text-lg">Loading...</p>
            </div>
          ) : (
            <>
              <Dialog.Title className="text-xl font-bold mb-4">
                Edit Product
              </Dialog.Title>

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
                    onChange={(e) =>
                      setItemPrice({ ...item_price, single: e.target.value })
                    }
                    className="w-1/2 border rounded px-3 py-2"
                  />
                  <input
                    type="number"
                    placeholder="Combo Price (optional)"
                    value={item_price.meal}
                    onChange={(e) =>
                      setItemPrice({ ...item_price, meal: e.target.value })
                    }
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
                {editItem?.item_img_url && (
                  <div className="w-full mb-4">
                    <p className="text-sm text-gray-600 mb-1">Current Image:</p>
                    <Image
                      src={editItem.item_img_url.replace(
                        "/upload/",
                        "/upload/q_auto,f_auto/",
                      )}
                      alt="Current product"
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover rounded border"
                    />
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files && setImage(e.target.files[0])
                  }
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
                  Save Changes
                </button>
              </div>
            </>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EditProductModal;
