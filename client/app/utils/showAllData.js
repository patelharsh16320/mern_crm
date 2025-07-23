const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API

const getData = async (endpoint, options = {}) => {
    try {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'GET',
            cache: 'no-store',
            ...options,
        });
        if (!res.ok) throw new Error(`Failed to fetch from ${endpoint}`);
        return await res.json();
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error.message);
        throw error;
    }
};

const fetchAllUsers = () => getData('/show-users');
const fetchAllTicket = () => getData('/show-ticket');
const fetchAllRole = () => getData('/show-role');
const fetchAllProduct = () => getData('/show-product');
const fetchAllProductCategory = () => getData('/show-product_category');
const fetchAllProductCategoryMap = () => getData('/show-product_category_map');

export {
    fetchAllUsers, fetchAllTicket, fetchAllRole, fetchAllProduct, fetchAllProductCategory, fetchAllProductCategoryMap
};
