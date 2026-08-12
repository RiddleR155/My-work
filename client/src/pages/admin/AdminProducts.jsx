import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import { Skeleton } from '../../components/ui/Skeleton';
import { formatPrice } from '../../utils/format';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../../services/productService';
import { fetchCategories } from '../../services/categoryService';
import { getErrorMessage } from '../../services/api';

// Parsed from simple line-based textareas to keep the form straightforward:
// specifications: "Material: Full-grain leather" per line
// variants: "Size: S, M, L" per line
const parseSpecifications = (text) =>
  text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [key, ...rest] = line.split(':');
      return { key: key?.trim() || '', value: rest.join(':').trim() };
    })
    .filter((s) => s.key && s.value);

const parseVariants = (text) =>
  text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, ...rest] = line.split(':');
      const options = rest.join(':').split(',').map((o) => o.trim()).filter(Boolean);
      return { name: name?.trim() || '', options };
    })
    .filter((v) => v.name && v.options.length > 0);

const specsToText = (specs = []) => specs.map((s) => `${s.key}: ${s.value}`).join('\n');
const variantsToText = (variants = []) => variants.map((v) => `${v.name}: ${v.options.join(', ')}`).join('\n');

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const loadData = async () => {
    setLoading(true);
    try {
      const [productsData, categoriesData] = await Promise.all([
        fetchProducts({ limit: 100 }),
        fetchCategories(),
      ]);
      setProducts(productsData.products);
      setCategories(categoriesData);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateModal = () => {
    setEditingProduct(null);
    reset({
      name: '',
      description: '',
      price: '',
      category: categories[0]?._id || '',
      stock: '',
      images: '',
      specifications: '',
      variants: '',
      featured: false,
    });
    setModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    reset({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category?._id,
      stock: product.stock,
      images: product.images.join('\n'),
      specifications: specsToText(product.specifications),
      variants: variantsToText(product.variants),
      featured: product.featured,
    });
    setModalOpen(true);
  };

  const onSubmit = async (data) => {
    const payload = {
      name: data.name,
      description: data.description,
      price: Number(data.price),
      category: data.category,
      stock: Number(data.stock),
      images: data.images.split('\n').map((s) => s.trim()).filter(Boolean),
      specifications: parseSpecifications(data.specifications),
      variants: parseVariants(data.variants),
      featured: data.featured,
    };

    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, payload);
        toast.success('Product updated');
      } else {
        await createProduct(payload);
        toast.success('Product created');
      }
      setModalOpen(false);
      loadData();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await deleteProduct(deleteTarget._id);
      toast.success('Product deleted');
      setDeleteTarget(null);
      loadData();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setDeleting(false);
    }
  };

  const inputClass =
    'w-full border border-charcoal-900/20 px-3 py-2.5 text-sm bg-cream-100 focus:outline-none focus:border-charcoal-900 transition-colors';

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-xl text-charcoal-900">Products ({products.length})</h1>
        <Button onClick={openCreateModal}>
          <Plus size={16} /> Add Product
        </Button>
      </div>

      {loading ? (
        <Skeleton className="h-96" />
      ) : (
        <div className="bg-white border border-charcoal-900/10 rounded overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-charcoal-700/60 border-b border-charcoal-900/10">
                <th className="px-6 py-3 font-medium">Product</th>
                <th className="px-6 py-3 font-medium">Category</th>
                <th className="px-6 py-3 font-medium">Price</th>
                <th className="px-6 py-3 font-medium">Stock</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b border-charcoal-900/5 last:border-0">
                  <td className="px-6 py-3 flex items-center gap-3">
                    <img src={product.images[0]} alt={product.name} className="w-10 h-10 object-cover rounded" />
                    <span className="text-charcoal-900 line-clamp-1">{product.name}</span>
                  </td>
                  <td className="px-6 py-3 text-charcoal-700/80">{product.category?.name}</td>
                  <td className="px-6 py-3 text-charcoal-900">{formatPrice(product.price)}</td>
                  <td className="px-6 py-3">
                    <span className={product.stock < 5 ? 'text-red-700 font-medium' : 'text-charcoal-700/80'}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center justify-end gap-3">
                      <button onClick={() => openEditModal(product)} aria-label={`Edit ${product.name}`} className="text-charcoal-700/60 hover:text-charcoal-900">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => setDeleteTarget(product)} aria-label={`Delete ${product.name}`} className="text-charcoal-700/60 hover:text-red-700">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editingProduct ? 'Edit Product' : 'Add Product'} maxWidth="max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm text-charcoal-900 mb-2">Product Name *</label>
            <input className={inputClass} {...register('name', { required: 'Name is required' })} />
            {errors.name && <p className="text-red-700 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm text-charcoal-900 mb-2">Description *</label>
            <textarea rows={3} className={inputClass} {...register('description', { required: 'Description is required' })} />
            {errors.description && <p className="text-red-700 text-xs mt-1">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-charcoal-900 mb-2">Price (PKR) *</label>
              <input type="number" min="0" className={inputClass} {...register('price', { required: true, min: 0 })} />
            </div>
            <div>
              <label className="block text-sm text-charcoal-900 mb-2">Stock *</label>
              <input type="number" min="0" className={inputClass} {...register('stock', { required: true, min: 0 })} />
            </div>
            <div>
              <label className="block text-sm text-charcoal-900 mb-2">Category *</label>
              <select className={inputClass} {...register('category', { required: true })}>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-charcoal-900 mb-2">Image URLs (one per line) *</label>
            <textarea rows={2} className={inputClass} placeholder="https://..." {...register('images', { required: 'At least one image URL is required' })} />
            {errors.images && <p className="text-red-700 text-xs mt-1">{errors.images.message}</p>}
          </div>

          <div>
            <label className="block text-sm text-charcoal-900 mb-2">Specifications (one per line, "Key: Value")</label>
            <textarea rows={3} className={inputClass} placeholder="Material: Full-grain leather" {...register('specifications')} />
          </div>

          <div>
            <label className="block text-sm text-charcoal-900 mb-2">Variants (one per line, "Name: option1, option2")</label>
            <textarea rows={2} className={inputClass} placeholder="Size: S, M, L, XL" {...register('variants')} />
          </div>

          <label className="flex items-center gap-2 text-sm text-charcoal-900">
            <input type="checkbox" {...register('featured')} />
            Featured Product
          </label>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={isSubmitting}>
              {editingProduct ? 'Save Changes' : 'Create Product'}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Product">
        <p className="text-charcoal-700/80 mb-6">
          Are you sure you want to delete <strong>{deleteTarget?.name}</strong>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setDeleteTarget(null)}>
            Cancel
          </Button>
          <Button variant="danger" loading={deleting} onClick={confirmDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminProducts;
