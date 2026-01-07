const API_BASE_URL = 'https://dummyjson.com'

function normalizeProduct(raw) {
  if (!raw) return null

  return {
    id: String(raw.id),
    name: raw.title ?? 'Untitled product',
    description: raw.description ?? '',
    price: Number.isFinite(Number(raw.price)) ? Number(raw.price) : 0,
    category: raw.category ?? 'Uncategorized',
    image: raw.thumbnail || (Array.isArray(raw.images) && raw.images[0]) || '',
    rating: Number.isFinite(Number(raw.rating)) ? Number(raw.rating) : 0,
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    inStock: typeof raw.stock === 'number' ? raw.stock > 0 : true,
  }
}

export async function fetchProducts() {
  const response = await fetch(`${API_BASE_URL}/products?limit=100`)

  if (!response.ok) {
    throw new Error('Failed to load products')
  }

  const data = await response.json()
  const list = Array.isArray(data.products) ? data.products : []
  return list.map(normalizeProduct).filter(Boolean)
}

export async function fetchProductById(id) {
  const response = await fetch(`${API_BASE_URL}/products/${id}`)

  if (!response.ok) {
    throw new Error('Failed to load product')
  }

  const raw = await response.json()
  return normalizeProduct(raw)
}
