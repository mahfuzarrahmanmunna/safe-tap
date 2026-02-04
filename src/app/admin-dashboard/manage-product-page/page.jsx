"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFirebaseAuth } from "@/app/contexts/FirebaseAuthContext";
import { toast } from "react-hot-toast";
import {
    Home,
    Package,
    Image,
    Edit,
    Trash2,
    Plus,
    Eye,
    Save,
    X,
    Upload,
    ChevronLeft,
    ChevronRight,
    Filter,
    Search,
    RefreshCw,
    Settings,
    DollarSign,
    Star,
    Shield,
    Zap,
    CheckCircle,
    AlertCircle,
    Loader2,
    ChevronDown,
    Grid,
    List,
    Copy,
    ExternalLink,
    TrendingUp,
    BarChart3,
    Activity,
    MapPin,
    HelpCircle,
    MessageSquare,
} from "lucide-react";
import Link from "next/link";

export default function ManageProductPage() {
    const { user } = useFirebaseAuth();
    const router = useRouter();

    // State for different data types
    const [activeTab, setActiveTab] = useState("slides");
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [viewMode, setViewMode] = useState("grid"); // grid or list

    // Data states
    const [cities, setCities] = useState([]);
    const [citySlides, setCitySlides] = useState([]);
    const [productFeatures, setProductFeatures] = useState([]);
    const [techSpecs, setTechSpecs] = useState([]);
    const [smartFeatures, setSmartFeatures] = useState([]);
    const [techStages, setTechStages] = useState([]);
    const [pricingPlans, setPricingPlans] = useState([]);
    const [productInfo, setProductInfo] = useState([]);
    const [comparisonPoints, setComparisonPoints] = useState([]);
    const [whyChoosePoints, setWhyChoosePoints] = useState([]);
    const [faqCategories, setFaqCategories] = useState([]);
    const [faqs, setFaqs] = useState([]);
    const [reviews, setReviews] = useState([]);

    // Form states
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({});
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedProductType, setSelectedProductType] = useState("copper");

    // Image upload states
    const [imageFiles, setImageFiles] = useState({});
    const [imagePreviews, setImagePreviews] = useState({});

    // City management states
    const [showCityModal, setShowCityModal] = useState(false);
    const [cityFormData, setCityFormData] = useState({
        name: "",
        slug: "",
    });

    // Filter states
    const [filterCity, setFilterCity] = useState("all");
    const [filterProductType, setFilterProductType] = useState("all");
    const [filterStatus, setFilterStatus] = useState("all");

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);

    // Auth token
    const [authToken, setAuthToken] = useState(null);

    // Get auth token
    useEffect(() => {
        if (user) {
            user.getIdToken().then(token => {
                setAuthToken(token);
            }).catch(error => {
                console.error("Error getting ID token:", error);
            });
        }
    }, [user]);

    // Fetch data based on active tab
    useEffect(() => {
        if (authToken) {
            fetchCities();
            fetchFaqCategories(); // Fetch FAQ categories for the FAQ tab

            switch (activeTab) {
                case "slides":
                    fetchCitySlides();
                    break;
                case "features":
                    fetchProductFeatures();
                    break;
                case "techspecs":
                    fetchTechSpecs();
                    break;
                case "smartfeatures":
                    fetchSmartFeatures();
                    break;
                case "techstages":
                    fetchTechStages();
                    break;
                case "pricing":
                    fetchPricingPlans();
                    break;
                case "productinfo":
                    fetchProductInfo();
                    break;
                case "comparison":
                    fetchComparisonPoints();
                    break;
                case "whychoose":
                    fetchWhyChoosePoints();
                    break;
                case "faqs":
                    fetchFAQs();
                    break;
                case "reviews":
                    fetchReviews();
                    break;
            }
        }
    }, [authToken, activeTab, filterCity, filterProductType, filterStatus]);

    const fetchWithAuth = async (url, options = {}) => {
        try {
            const token = await user.getIdToken(true);

            const response = await fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 401) {
                await user.reload();
                const newToken = await user.getIdToken(true);

                const retryResponse = await fetch(url, {
                    ...options,
                    headers: {
                        ...options.headers,
                        Authorization: `Bearer ${newToken}`,
                    },
                });

                return retryResponse;
            }

            return response;
        } catch (error) {
            console.error("Auth fetch error:", error);
            throw error;
        }
    };

    // Handle image file selection
    const handleImageChange = (e, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            // Create a preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviews(prev => ({
                    ...prev,
                    [fieldName]: reader.result
                }));
            };
            reader.readAsDataURL(file);

            // Store the file
            setImageFiles(prev => ({
                ...prev,
                [fieldName]: file
            }));
        }
    };

    // Upload image and return URL
    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const token = await user.getIdToken(true);
            const response = await fetch('http://127.0.0.1:8000/api/upload-image/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                return data.image_url;
            } else {
                throw new Error('Failed to upload image');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error('Failed to upload image');
            return null;
        }
    };

    // Fetch functions
    const fetchCities = async () => {
        try {
            const response = await fetchWithAuth(`http://127.0.0.1:8000/api/cities/`);
            if (response.ok) {
                const data = await response.json();
                // Handle paginated response - extract results array if it exists
                const citiesArray = Array.isArray(data) ? data : (data.results || []);
                setCities(citiesArray);
                console.log("Cities data:", citiesArray);
            }
        } catch (error) {
            console.error("Error fetching cities:", error);
            toast.error("Failed to fetch cities");
        }
    };

    // Fetch FAQ categories
    const fetchFaqCategories = async () => {
        try {
            const response = await fetchWithAuth(`http://127.0.0.1:8000/api/faq-categories/`);
            if (response.ok) {
                const data = await response.json();
                const categoriesArray = Array.isArray(data) ? data : (data.results || []);
                setFaqCategories(categoriesArray);
            }
        } catch (error) {
            console.error("Error fetching FAQ categories:", error);
            toast.error("Failed to fetch FAQ categories");
        }
    };

    // Add city function
    const handleAddCity = async () => {
        try {
            // Generate slug from name if not provided
            const slugValue = cityFormData.slug || cityFormData.name.toLowerCase().replace(/\s+/g, '-');

            const response = await fetchWithAuth(`http://127.0.0.1:8000/api/cities/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...cityFormData,
                    slug: slugValue
                }),
            });

            if (response.ok) {
                const newCity = await response.json();
                setCities([...cities, newCity]);
                toast.success("City added successfully");
                setShowCityModal(false);
                setCityFormData({ name: "", slug: "" });
            } else {
                const error = await response.json();
                toast.error(error.detail || "Failed to add city");
            }
        } catch (error) {
            console.error("Error adding city:", error);
            toast.error("Failed to add city");
        }
    };

    const fetchCitySlides = async () => {
        try {
            setLoading(true);
            let url = `http://127.0.0.1:8000/api/city-slides/`;
            const params = new URLSearchParams();

            if (filterCity !== "all") params.append('city_id', filterCity);
            if (filterProductType !== "all") params.append('product_type', filterProductType);
            if (filterStatus !== "all") params.append('is_active', filterStatus === 'active');

            if (params.toString()) url += `?${params.toString()}`;

            const response = await fetchWithAuth(url);
            if (response.ok) {
                const data = await response.json();
                const slidesArray = Array.isArray(data) ? data : (data.results || []);
                setCitySlides(slidesArray);
            }
        } catch (error) {
            console.error("Error fetching city slides:", error);
            toast.error("Failed to fetch city slides");
        } finally {
            setLoading(false);
        }
    };

    const fetchProductFeatures = async () => {
        try {
            setLoading(true);
            const response = await fetchWithAuth(`http://127.0.0.1:8000/api/product-features/`);
            if (response.ok) {
                const data = await response.json();
                const featuresArray = Array.isArray(data) ? data : (data.results || []);
                setProductFeatures(featuresArray);
            }
        } catch (error) {
            console.error("Error fetching product features:", error);
            toast.error("Failed to fetch product features");
        } finally {
            setLoading(false);
        }
    };

    const fetchTechSpecs = async () => {
        try {
            setLoading(true);
            const response = await fetchWithAuth(`http://127.0.0.1:8000/api/tech-specifications/`);
            if (response.ok) {
                const data = await response.json();
                const specsArray = Array.isArray(data) ? data : (data.results || []);
                setTechSpecs(specsArray);
            }
        } catch (error) {
            console.error("Error fetching tech specs:", error);
            toast.error("Failed to fetch tech specifications");
        } finally {
            setLoading(false);
        }
    };

    const fetchSmartFeatures = async () => {
        try {
            setLoading(true);
            const response = await fetchWithAuth(`http://127.0.0.1:8000/api/smart-features/`);
            if (response.ok) {
                const data = await response.json();
                const featuresArray = Array.isArray(data) ? data : (data.results || []);
                setSmartFeatures(featuresArray);
            }
        } catch (error) {
            console.error("Error fetching smart features:", error);
            toast.error("Failed to fetch smart features");
        } finally {
            setLoading(false);
        }
    };

    const fetchTechStages = async () => {
        try {
            setLoading(true);
            const response = await fetchWithAuth(`http://127.0.0.1:8000/api/tech-stages/`);
            if (response.ok) {
                const data = await response.json();
                const stagesArray = Array.isArray(data) ? data : (data.results || []);
                setTechStages(stagesArray);
            }
        } catch (error) {
            console.error("Error fetching tech stages:", error);
            toast.error("Failed to fetch tech stages");
        } finally {
            setLoading(false);
        }
    };

    const fetchPricingPlans = async () => {
        try {
            setLoading(true);
            let url = `http://127.0.0.1:8000/api/pricing-plans/`;
            if (filterProductType !== "all") {
                url += `?product_type=${filterProductType}`;
            }

            const response = await fetchWithAuth(url);
            if (response.ok) {
                const data = await response.json();
                const plansArray = Array.isArray(data) ? data : (data.results || []);
                setPricingPlans(plansArray);
            }
        } catch (error) {
            console.error("Error fetching pricing plans:", error);
            toast.error("Failed to fetch pricing plans");
        } finally {
            setLoading(false);
        }
    };

    const fetchProductInfo = async () => {
        try {
            setLoading(true);
            let url = `http://127.0.0.1:8000/api/product-info/`;
            if (filterProductType !== "all") {
                url += `?product_type=${filterProductType}`;
            }

            const response = await fetchWithAuth(url);
            if (response.ok) {
                const data = await response.json();
                const infoArray = Array.isArray(data) ? data : (data.results || []);
                setProductInfo(infoArray);
            }
        } catch (error) {
            console.error("Error fetching product info:", error);
            toast.error("Failed to fetch product info");
        } finally {
            setLoading(false);
        }
    };

    const fetchComparisonPoints = async () => {
        try {
            setLoading(true);
            const response = await fetchWithAuth(`http://127.0.0.1:8000/api/comparison-points/`);
            if (response.ok) {
                const data = await response.json();
                const pointsArray = Array.isArray(data) ? data : (data.results || []);
                setComparisonPoints(pointsArray);
            }
        } catch (error) {
            console.error("Error fetching comparison points:", error);
            toast.error("Failed to fetch comparison points");
        } finally {
            setLoading(false);
        }
    };

    const fetchWhyChoosePoints = async () => {
        try {
            setLoading(true);
            const response = await fetchWithAuth(`http://127.0.0.1:8000/api/why-choose-points/`);
            if (response.ok) {
                const data = await response.json();
                const pointsArray = Array.isArray(data) ? data : (data.results || []);
                setWhyChoosePoints(pointsArray);
            }
        } catch (error) {
            console.error("Error fetching why choose points:", error);
            toast.error("Failed to fetch why choose points");
        } finally {
            setLoading(false);
        }
    };

    const fetchFAQs = async () => {
        try {
            setLoading(true);
            const response = await fetchWithAuth(`http://127.0.0.1:8000/api/faqs/`);
            if (response.ok) {
                const data = await response.json();
                const faqsArray = Array.isArray(data) ? data : (data.results || []);
                setFaqs(faqsArray);
            }
        } catch (error) {
            console.error("Error fetching FAQs:", error);
            toast.error("Failed to fetch FAQs");
        } finally {
            setLoading(false);
        }
    };

    const fetchReviews = async () => {
        try {
            setLoading(true);
            const response = await fetchWithAuth(`http://127.0.0.1:8000/api/reviews/`);
            if (response.ok) {
                const data = await response.json();
                const reviewsArray = Array.isArray(data) ? data : (data.results || []);
                setReviews(reviewsArray);
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
            toast.error("Failed to fetch reviews");
        } finally {
            setLoading(false);
        }
    };

    // Get current data based on active tab
    const getCurrentData = () => {
        switch (activeTab) {
            case "slides": return citySlides;
            case "features": return productFeatures;
            case "techspecs": return techSpecs;
            case "smartfeatures": return smartFeatures;
            case "techstages": return techStages;
            case "pricing": return pricingPlans;
            case "productinfo": return productInfo;
            case "comparison": return comparisonPoints;
            case "whychoose": return whyChoosePoints;
            case "faqs": return faqs;
            case "reviews": return reviews;
            default: return [];
        }
    };

    // Filter data
    const getFilteredData = () => {
        let data = getCurrentData();

        if (searchQuery) {
            data = data.filter(item => {
                const searchLower = searchQuery.toLowerCase();
                return JSON.stringify(item).toLowerCase().includes(searchLower);
            });
        }

        return data;
    };

    // Get paginated data
    const getPaginatedData = () => {
        const filtered = getFilteredData();
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filtered.slice(startIndex, startIndex + itemsPerPage);
    };

    // Handle create/edit
    const handleCreate = () => {
        setEditingItem(null);
        setFormData(getDefaultFormData());
        setImageFiles({});
        setImagePreviews({});
        setShowModal(true);
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData(item);
        setImageFiles({});
        setImagePreviews({});
        setShowModal(true);
    };

    const getDefaultFormData = () => {
        switch (activeTab) {
            case "slides":
                return {
                    city: "",
                    product_type: "copper",
                    title: "",
                    subtitle: "",
                    description: "",
                    image: "",
                    color: "",
                    order: 0,
                    is_active: true,
                };
            case "features":
                return {
                    title: "",
                    description: "",
                    image: "",
                    order: 0,
                    is_active: true,
                };
            case "techspecs":
                return {
                    icon_name: "",
                    title: "",
                    details: "",
                    order: 0,
                    is_active: true,
                };
            case "smartfeatures":
                return {
                    title: "",
                    description: "",
                    image: "",
                    order: 0,
                    is_active: true,
                };
            case "techstages":
                return {
                    title: "",
                    image: "",
                    order: 0,
                    is_active: true,
                };
            case "pricing":
                return {
                    product_type: "copper",
                    plan_name: "",
                    plan_details: "",
                    price_28_days: 0,
                    price_90_days: 0,
                    price_360_days: 0,
                    savings: 0,
                    is_active: true,
                };
            case "productinfo":
                return {
                    product_type: "copper",
                    name: "",
                    subtitle: "",
                    description: "",
                    is_active: true,
                };
            case "comparison":
                return {
                    category: "",
                    water_can_description: "",
                    other_purifier_description: "",
                    safetap_description: "",
                    order: 0,
                    is_active: true,
                };
            case "whychoose":
                return {
                    label: "",
                    title: "",
                    description: "",
                    image: "",
                    order: 0,
                    is_active: true,
                };
            case "faqs":
                return {
                    category: "",
                    question: "",
                    answer: "",
                    order: 0,
                    is_active: true,
                };
            case "reviews":
                return {
                    name: "",
                    rating: 5,
                    comment: "",
                    avatar: "",
                    city: "",
                    is_verified: false,
                    is_active: true,
                };
            default:
                return {};
        }
    };

    // Handle save
    const handleSave = async () => {
        try {
            // Upload images if any
            const updatedFormData = { ...formData };

            // Handle different image fields based on the active tab
            if (activeTab === "slides" && imageFiles.image) {
                const imageUrl = await uploadImage(imageFiles.image);
                if (imageUrl) updatedFormData.image = imageUrl;
            } else if (activeTab === "features" && imageFiles.image) {
                const imageUrl = await uploadImage(imageFiles.image);
                if (imageUrl) updatedFormData.image = imageUrl;
            } else if (activeTab === "smartfeatures" && imageFiles.image) {
                const imageUrl = await uploadImage(imageFiles.image);
                if (imageUrl) updatedFormData.image = imageUrl;
            } else if (activeTab === "techstages" && imageFiles.image) {
                const imageUrl = await uploadImage(imageFiles.image);
                if (imageUrl) updatedFormData.image = imageUrl;
            } else if (activeTab === "whychoose" && imageFiles.image) {
                const imageUrl = await uploadImage(imageFiles.image);
                if (imageUrl) updatedFormData.image = imageUrl;
            } else if (activeTab === "reviews" && imageFiles.avatar) {
                const imageUrl = await uploadImage(imageFiles.avatar);
                if (imageUrl) updatedFormData.avatar = imageUrl;
            }

            let url, method;
            const isFormData = Object.keys(imageFiles).length > 0;

            if (editingItem) {
                // Update existing item
                url = `http://127.0.0.1:8000/api/${getApiEndpoint()}/${editingItem.id}/`;
                method = "PUT";
            } else {
                // Create new item
                url = `http://127.0.0.1:8000/api/${getApiEndpoint()}/`;
                method = "POST";
            }

            const response = await fetchWithAuth(url, {
                method,
                headers: isFormData ? {} : { "Content-Type": "application/json" },
                body: isFormData ? createFormDataWithImages(updatedFormData) : JSON.stringify(updatedFormData),
            });

            if (response.ok) {
                toast.success(`Item ${editingItem ? 'updated' : 'created'} successfully`);
                setShowModal(false);
                setImageFiles({});
                setImagePreviews({});
                // Refetch data
                switch (activeTab) {
                    case "slides": fetchCitySlides(); break;
                    case "features": fetchProductFeatures(); break;
                    case "techspecs": fetchTechSpecs(); break;
                    case "smartfeatures": fetchSmartFeatures(); break;
                    case "techstages": fetchTechStages(); break;
                    case "pricing": fetchPricingPlans(); break;
                    case "productinfo": fetchProductInfo(); break;
                    case "comparison": fetchComparisonPoints(); break;
                    case "whychoose": fetchWhyChoosePoints(); break;
                    case "faqs": fetchFAQs(); break;
                    case "reviews": fetchReviews(); break;
                }
            } else {
                const error = await response.json();
                toast.error(error.detail || "Failed to save item");
            }
        } catch (error) {
            console.error("Error saving item:", error);
            toast.error("Failed to save item");
        }
    };

    // Create FormData with images
    const createFormDataWithImages = (data) => {
        const formData = new FormData();

        // Add all form data fields
        Object.keys(data).forEach(key => {
            if (key !== 'image' && key !== 'avatar') {
                formData.append(key, data[key]);
            }
        });

        // Add image files if they exist
        if (imageFiles.image) {
            formData.append('image', imageFiles.image);
        }
        if (imageFiles.avatar) {
            formData.append('avatar', imageFiles.avatar);
        }

        return formData;
    };

    // Handle delete
    const handleDelete = async (item) => {
        if (!confirm(`Are you sure you want to delete this item?`)) return;

        try {
            const response = await fetchWithAuth(
                `http://127.0.0.1:8000/api/${getApiEndpoint()}/${item.id}/`,
                { method: "DELETE" }
            );

            if (response.ok) {
                toast.success("Item deleted successfully");
                // Refetch data
                switch (activeTab) {
                    case "slides": fetchCitySlides(); break;
                    case "features": fetchProductFeatures(); break;
                    case "techspecs": fetchTechSpecs(); break;
                    case "smartfeatures": fetchSmartFeatures(); break;
                    case "techstages": fetchTechStages(); break;
                    case "pricing": fetchPricingPlans(); break;
                    case "productinfo": fetchProductInfo(); break;
                    case "comparison": fetchComparisonPoints(); break;
                    case "whychoose": fetchWhyChoosePoints(); break;
                    case "faqs": fetchFAQs(); break;
                    case "reviews": fetchReviews(); break;
                }
            } else {
                toast.error("Failed to delete item");
            }
        } catch (error) {
            console.error("Error deleting item:", error);
            toast.error("Failed to delete item");
        }
    };

    // Get API endpoint for current tab
    const getApiEndpoint = () => {
        const endpoints = {
            slides: "city-slides",
            features: "product-features",
            techspecs: "tech-specifications",
            smartfeatures: "smart-features",
            techstages: "tech-stages",
            pricing: "pricing-plans",
            productinfo: "product-info",
            comparison: "comparison-points",
            whychoose: "why-choose-points",
            faqs: "faqs",
            reviews: "reviews",
        };
        return endpoints[activeTab] || "";
    };

    // Render form fields based on active tab
    const renderFormFields = () => {
        switch (activeTab) {
            case "slides":
                return (
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    City
                                </label>
                                <select
                                    value={formData.city || ""}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                    required
                                >
                                    <option value="">Select City</option>
                                    {cities.map(city => (
                                        <option key={city.id} value={city.id}>{city.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Product Type
                                </label>
                                <select
                                    value={formData.product_type || ""}
                                    onChange={(e) => setFormData({ ...formData, product_type: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                >
                                    <option value="copper">Copper</option>
                                    <option value="ro_plus">RO+</option>
                                    <option value="alkaline">Alkaline</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                value={formData.title || ""}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Subtitle
                            </label>
                            <input
                                type="text"
                                value={formData.subtitle || ""}
                                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Description
                            </label>
                            <textarea
                                value={formData.description || ""}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Image
                            </label>
                            <div className="space-y-2">
                                {imagePreviews.image ? (
                                    <div className="relative">
                                        <img
                                            src={imagePreviews.image}
                                            alt="Preview"
                                            className="w-full h-40 object-cover rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setImageFiles(prev => {
                                                    const newFiles = { ...prev };
                                                    delete newFiles.image;
                                                    return newFiles;
                                                });
                                                setImagePreviews(prev => {
                                                    const newPreviews = { ...prev };
                                                    delete newPreviews.image;
                                                    return newPreviews;
                                                });
                                            }}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
                                        <input
                                            type="file"
                                            id="slide-image"
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(e, 'image')}
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor="slide-image"
                                            className="cursor-pointer flex flex-col items-center"
                                        >
                                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                Click to upload image
                                            </span>
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Color
                                </label>
                                <input
                                    type="text"
                                    value={formData.color || ""}
                                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Order
                                </label>
                                <input
                                    type="number"
                                    value={formData.order || 0}
                                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                            </div>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="is_active"
                                checked={formData.is_active || false}
                                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                className="mr-2"
                            />
                            <label htmlFor="is_active" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Active
                            </label>
                        </div>
                    </>
                );

            case "features":
                return (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                value={formData.title || ""}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Description
                            </label>
                            <textarea
                                value={formData.description || ""}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Image
                            </label>
                            <div className="space-y-2">
                                {imagePreviews.image ? (
                                    <div className="relative">
                                        <img
                                            src={imagePreviews.image}
                                            alt="Preview"
                                            className="w-full h-40 object-cover rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setImageFiles(prev => {
                                                    const newFiles = { ...prev };
                                                    delete newFiles.image;
                                                    return newFiles;
                                                });
                                                setImagePreviews(prev => {
                                                    const newPreviews = { ...prev };
                                                    delete newPreviews.image;
                                                    return newPreviews;
                                                });
                                            }}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
                                        <input
                                            type="file"
                                            id="feature-image"
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(e, 'image')}
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor="feature-image"
                                            className="cursor-pointer flex flex-col items-center"
                                        >
                                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                Click to upload image
                                            </span>
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Order
                                </label>
                                <input
                                    type="number"
                                    value={formData.order || 0}
                                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                            </div>
                            <div className="flex items-center mt-6">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={formData.is_active || false}
                                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                    className="mr-2"
                                />
                                <label htmlFor="is_active" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Active
                                </label>
                            </div>
                        </div>
                    </>
                );

            case "techspecs":
                return (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Icon Name
                            </label>
                            <input
                                type="text"
                                value={formData.icon_name || ""}
                                onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                placeholder="e.g., Shield, Zap"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                value={formData.title || ""}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Details
                            </label>
                            <input
                                type="text"
                                value={formData.details || ""}
                                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Order
                                </label>
                                <input
                                    type="number"
                                    value={formData.order || 0}
                                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                            </div>
                            <div className="flex items-center mt-6">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={formData.is_active || false}
                                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                    className="mr-2"
                                />
                                <label htmlFor="is_active" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Active
                                </label>
                            </div>
                        </div>
                    </>
                );

            case "smartfeatures":
                return (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                value={formData.title || ""}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Description
                            </label>
                            <textarea
                                value={formData.description || ""}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Image
                            </label>
                            <div className="space-y-2">
                                {imagePreviews.image ? (
                                    <div className="relative">
                                        <img
                                            src={imagePreviews.image}
                                            alt="Preview"
                                            className="w-full h-40 object-cover rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setImageFiles(prev => {
                                                    const newFiles = { ...prev };
                                                    delete newFiles.image;
                                                    return newFiles;
                                                });
                                                setImagePreviews(prev => {
                                                    const newPreviews = { ...prev };
                                                    delete newPreviews.image;
                                                    return newPreviews;
                                                });
                                            }}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
                                        <input
                                            type="file"
                                            id="smartfeature-image"
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(e, 'image')}
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor="smartfeature-image"
                                            className="cursor-pointer flex flex-col items-center"
                                        >
                                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                Click to upload image
                                            </span>
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Order
                                </label>
                                <input
                                    type="number"
                                    value={formData.order || 0}
                                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                            </div>
                            <div className="flex items-center mt-6">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={formData.is_active || false}
                                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                    className="mr-2"
                                />
                                <label htmlFor="is_active" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Active
                                </label>
                            </div>
                        </div>
                    </>
                );

            case "techstages":
                return (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                value={formData.title || ""}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Image
                            </label>
                            <div className="space-y-2">
                                {imagePreviews.image ? (
                                    <div className="relative">
                                        <img
                                            src={imagePreviews.image}
                                            alt="Preview"
                                            className="w-full h-40 object-cover rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setImageFiles(prev => {
                                                    const newFiles = { ...prev };
                                                    delete newFiles.image;
                                                    return newFiles;
                                                });
                                                setImagePreviews(prev => {
                                                    const newPreviews = { ...prev };
                                                    delete newPreviews.image;
                                                    return newPreviews;
                                                });
                                            }}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
                                        <input
                                            type="file"
                                            id="techstage-image"
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(e, 'image')}
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor="techstage-image"
                                            className="cursor-pointer flex flex-col items-center"
                                        >
                                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                Click to upload image
                                            </span>
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Order
                                </label>
                                <input
                                    type="number"
                                    value={formData.order || 0}
                                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                            </div>
                            <div className="flex items-center mt-6">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={formData.is_active || false}
                                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                    className="mr-2"
                                />
                                <label htmlFor="is_active" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Active
                                </label>
                            </div>
                        </div>
                    </>
                );

            case "pricing":
                return (
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Product Type
                                </label>
                                <select
                                    value={formData.product_type || ""}
                                    onChange={(e) => setFormData({ ...formData, product_type: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                >
                                    <option value="copper">Copper</option>
                                    <option value="ro_plus">RO+</option>
                                    <option value="alkaline">Alkaline</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Plan Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.plan_name || ""}
                                    onChange={(e) => setFormData({ ...formData, plan_name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Plan Details
                            </label>
                            <input
                                type="text"
                                value={formData.plan_details || ""}
                                onChange={(e) => setFormData({ ...formData, plan_details: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Price (28 days)
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={formData.price_28_days || 0}
                                    onChange={(e) => setFormData({ ...formData, price_28_days: parseFloat(e.target.value) })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Price (90 days)
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={formData.price_90_days || 0}
                                    onChange={(e) => setFormData({ ...formData, price_90_days: parseFloat(e.target.value) })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Price (360 days)
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={formData.price_360_days || 0}
                                    onChange={(e) => setFormData({ ...formData, price_360_days: parseFloat(e.target.value) })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Savings
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={formData.savings || 0}
                                    onChange={(e) => setFormData({ ...formData, savings: parseFloat(e.target.value) })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                            </div>
                            <div className="flex items-center mt-6">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={formData.is_active || false}
                                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                    className="mr-2"
                                />
                                <label htmlFor="is_active" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Active
                                </label>
                            </div>
                        </div>
                    </>
                );

            case "productinfo":
                return (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Product Type
                            </label>
                            <select
                                value={formData.product_type || ""}
                                onChange={(e) => setFormData({ ...formData, product_type: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            >
                                <option value="copper">Copper</option>
                                <option value="ro_plus">RO+</option>
                                <option value="alkaline">Alkaline</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                value={formData.name || ""}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Subtitle
                            </label>
                            <input
                                type="text"
                                value={formData.subtitle || ""}
                                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Description
                            </label>
                            <textarea
                                value={formData.description || ""}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            />
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="is_active"
                                checked={formData.is_active || false}
                                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                className="mr-2"
                            />
                            <label htmlFor="is_active" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Active
                            </label>
                        </div>
                    </>
                );

            case "comparison":
                return (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Category
                            </label>
                            <input
                                type="text"
                                value={formData.category || ""}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Water Can Description
                            </label>
                            <textarea
                                value={formData.water_can_description || ""}
                                onChange={(e) => setFormData({ ...formData, water_can_description: e.target.value })}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Other Purifier Description
                            </label>
                            <textarea
                                value={formData.other_purifier_description || ""}
                                onChange={(e) => setFormData({ ...formData, other_purifier_description: e.target.value })}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Safetap Description
                            </label>
                            <textarea
                                value={formData.safetap_description || ""}
                                onChange={(e) => setFormData({ ...formData, safetap_description: e.target.value })}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Order
                                </label>
                                <input
                                    type="number"
                                    value={formData.order || 0}
                                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                            </div>
                            <div className="flex items-center mt-6">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={formData.is_active || false}
                                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                    className="mr-2"
                                />
                                <label htmlFor="is_active" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Active
                                </label>
                            </div>
                        </div>
                    </>
                );

            case "whychoose":
                return (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Label
                            </label>
                            <input
                                type="text"
                                value={formData.label || ""}
                                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                value={formData.title || ""}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Description
                            </label>
                            <textarea
                                value={formData.description || ""}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Image
                            </label>
                            <div className="space-y-2">
                                {imagePreviews.image ? (
                                    <div className="relative">
                                        <img
                                            src={imagePreviews.image}
                                            alt="Preview"
                                            className="w-full h-40 object-cover rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setImageFiles(prev => {
                                                    const newFiles = { ...prev };
                                                    delete newFiles.image;
                                                    return newFiles;
                                                });
                                                setImagePreviews(prev => {
                                                    const newPreviews = { ...prev };
                                                    delete newPreviews.image;
                                                    return newPreviews;
                                                });
                                            }}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
                                        <input
                                            type="file"
                                            id="whychoose-image"
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(e, 'image')}
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor="whychoose-image"
                                            className="cursor-pointer flex flex-col items-center"
                                        >
                                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                Click to upload image
                                            </span>
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Order
                                </label>
                                <input
                                    type="number"
                                    value={formData.order || 0}
                                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                            </div>
                            <div className="flex items-center mt-6">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={formData.is_active || false}
                                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                    className="mr-2"
                                />
                                <label htmlFor="is_active" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Active
                                </label>
                            </div>
                        </div>
                    </>
                );

            case "faqs":
                return (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Category
                            </label>
                            <select
                                value={formData.category || ""}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                required
                            >
                                <option value="">Select Category</option>
                                {faqCategories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Question
                            </label>
                            <input
                                type="text"
                                value={formData.question || ""}
                                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Answer
                            </label>
                            <textarea
                                value={formData.answer || ""}
                                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Order
                                </label>
                                <input
                                    type="number"
                                    value={formData.order || 0}
                                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                            </div>
                            <div className="flex items-center mt-6">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={formData.is_active || false}
                                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                    className="mr-2"
                                />
                                <label htmlFor="is_active" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Active
                                </label>
                            </div>
                        </div>
                    </>
                );

            case "reviews":
                return (
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.name || ""}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    City
                                </label>
                                <input
                                    type="text"
                                    value={formData.city || ""}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Rating
                            </label>
                            <select
                                value={formData.rating || 5}
                                onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            >
                                <option value={5}>5 Stars</option>
                                <option value={4}>4 Stars</option>
                                <option value={3}>3 Stars</option>
                                <option value={2}>2 Stars</option>
                                <option value={1}>1 Star</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Comment
                            </label>
                            <textarea
                                value={formData.comment || ""}
                                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Avatar
                            </label>
                            <div className="space-y-2">
                                {imagePreviews.avatar ? (
                                    <div className="relative">
                                        <img
                                            src={imagePreviews.avatar}
                                            alt="Preview"
                                            className="w-24 h-24 object-cover rounded-full"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setImageFiles(prev => {
                                                    const newFiles = { ...prev };
                                                    delete newFiles.avatar;
                                                    return newFiles;
                                                });
                                                setImagePreviews(prev => {
                                                    const newPreviews = { ...prev };
                                                    delete newPreviews.avatar;
                                                    return newPreviews;
                                                });
                                            }}
                                            className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
                                        <input
                                            type="file"
                                            id="review-avatar"
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(e, 'avatar')}
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor="review-avatar"
                                            className="cursor-pointer flex flex-col items-center"
                                        >
                                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                Click to upload avatar
                                            </span>
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center mt-6">
                                <input
                                    type="checkbox"
                                    id="is_verified"
                                    checked={formData.is_verified || false}
                                    onChange={(e) => setFormData({ ...formData, is_verified: e.target.checked })}
                                    className="mr-2"
                                />
                                <label htmlFor="is_verified" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Verified
                                </label>
                            </div>
                            <div className="flex items-center mt-6">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={formData.is_active || false}
                                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                    className="mr-2"
                                />
                                <label htmlFor="is_active" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Active
                                </label>
                            </div>
                        </div>
                    </>
                );

            default:
                return (
                    <div>
                        <p className="text-gray-500 dark:text-gray-400">Form fields not implemented for this tab</p>
                    </div>
                );
        }
    };

    // Render item card based on active tab
    const renderItemCard = (item) => {
        const commonCard = (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                        {item.title || item.name || item.question || item.category || item.plan_name}
                    </h3>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => handleEdit(item)}
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            <Edit className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => handleDelete(item)}
                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Display different content based on tab */}
                {activeTab === "slides" && (
                    <div className="space-y-2">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            City: {cities.find(c => c.id === item.city)?.name || 'N/A'}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Type: {item.product_type}
                        </p>
                        {item.image && (
                            <img src={item.image} alt={item.title} className="w-full h-32 object-cover rounded" />
                        )}
                    </div>
                )}

                {activeTab === "features" && (
                    <div className="space-y-2">
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {item.description}
                        </p>
                        {item.image && (
                            <img src={item.image} alt={item.title} className="w-full h-32 object-cover rounded" />
                        )}
                    </div>
                )}

                {activeTab === "techspecs" && (
                    <div className="space-y-2">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Icon: {item.icon_name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {item.details}
                        </p>
                    </div>
                )}

                {activeTab === "smartfeatures" && (
                    <div className="space-y-2">
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {item.description}
                        </p>
                        {item.image && (
                            <img src={item.image} alt={item.title} className="w-full h-32 object-cover rounded" />
                        )}
                    </div>
                )}

                {activeTab === "techstages" && (
                    <div className="space-y-2">
                        {item.image && (
                            <img src={item.image} alt={item.title} className="w-full h-32 object-cover rounded" />
                        )}
                    </div>
                )}

                {activeTab === "pricing" && (
                    <div className="space-y-2">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {item.product_type} - {item.plan_name}
                        </p>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                            <div>
                                <span className="font-semibold">28d:</span> ৳{item.price_28_days}
                            </div>
                            <div>
                                <span className="font-semibold">90d:</span> ৳{item.price_90_days}
                            </div>
                            <div>
                                <span className="font-semibold">360d:</span> ৳{item.price_360_days}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "productinfo" && (
                    <div className="space-y-2">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Type: {item.product_type}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {item.subtitle}
                        </p>
                    </div>
                )}

                {activeTab === "comparison" && (
                    <div className="space-y-2">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Category: {item.category}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            Safetap: {item.safetap_description}
                        </p>
                    </div>
                )}

                {activeTab === "whychoose" && (
                    <div className="space-y-2">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Label: {item.label}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {item.description}
                        </p>
                        {item.image && (
                            <img src={item.image} alt={item.title} className="w-full h-32 object-cover rounded" />
                        )}
                    </div>
                )}

                {activeTab === "faqs" && (
                    <div className="space-y-2">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Category: {faqCategories.find(c => c.id === item.category)?.name || 'N/A'}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {item.answer}
                        </p>
                    </div>
                )}

                {activeTab === "reviews" && (
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mr-2">
                                {item.name}
                            </p>
                            {item.city && (
                                <p className="text-xs text-gray-500 dark:text-gray-500">
                                    from {item.city}
                                </p>
                            )}
                        </div>
                        <div className="flex items-center">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < item.rating
                                            ? 'text-yellow-400 fill-current'
                                            : 'text-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>
                            {item.is_verified && (
                                <CheckCircle className="w-4 h-4 text-green-500 ml-2" />
                            )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {item.comment}
                        </p>
                        {item.avatar && (
                            <img src={item.avatar} alt={item.name} className="w-12 h-12 rounded-full object-cover" />
                        )}
                    </div>
                )}

                <div className="mt-2 flex justify-between items-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${item.is_active
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}>
                        {item.is_active ? 'Active' : 'Inactive'}
                    </span>
                    {item.order !== undefined && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            Order: {item.order}
                        </span>
                    )}
                </div>
            </div>
        );

        return commonCard;
    };

    const tabs = [
        { id: "slides", label: "City Slides", icon: Image },
        { id: "features", label: "Product Features", icon: Star },
        { id: "techspecs", label: "Tech Specs", icon: Settings },
        { id: "smartfeatures", label: "Smart Features", icon: Zap },
        { id: "techstages", label: "Tech Stages", icon: Activity },
        { id: "pricing", label: "Pricing Plans", icon: DollarSign },
        { id: "productinfo", label: "Product Info", icon: Package },
        { id: "comparison", label: "Comparison", icon: BarChart3 },
        { id: "whychoose", label: "Why Choose", icon: CheckCircle },
        { id: "faqs", label: "FAQs", icon: HelpCircle },
        { id: "reviews", label: "Reviews", icon: MessageSquare },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/admin-dashboard"
                            className="text-white hover:text-purple-100"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold">Manage Products</h1>
                            <p className="text-purple-100">
                                Manage all product-related content and data
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Package className="w-8 h-8" />
                        <span className="text-xl font-semibold">Product Management</span>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap gap-2 p-4 border-b border-gray-200 dark:border-gray-700">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === tab.id
                                ? 'bg-purple-600 text-white'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Filters and Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div className="flex gap-3">
                    {activeTab === "slides" && (
                        <div className="flex items-center gap-2">
                            <select
                                value={filterCity}
                                onChange={(e) => setFilterCity(e.target.value)}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            >
                                <option value="all">All Cities</option>
                                {cities.map(city => (
                                    <option key={city.id} value={city.id}>{city.name}</option>
                                ))}
                            </select>
                            <button
                                onClick={() => setShowCityModal(true)}
                                className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                <MapPin className="w-4 h-4" />
                                <span>Add City</span>
                            </button>
                        </div>
                    )}

                    {(activeTab === "slides" || activeTab === "pricing" || activeTab === "productinfo") && (
                        <select
                            value={filterProductType}
                            onChange={(e) => setFilterProductType(e.target.value)}
                            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        >
                            <option value="all">All Types</option>
                            <option value="copper">Copper</option>
                            <option value="ro_plus">RO+</option>
                            <option value="alkaline">Alkaline</option>
                        </select>
                    )}

                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

                <div className="flex gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:flex-initial">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-64"
                        />
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${showFilters
                            ? "bg-purple-100 text-purple-700 border-purple-300"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                            }`}
                    >
                        <Filter className="w-4 h-4" />
                        <span>Filters</span>
                    </button>
                    <button
                        onClick={handleCreate}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add New
                    </button>
                    <button
                        onClick={() => {
                            switch (activeTab) {
                                case "slides": fetchCitySlides(); break;
                                case "features": fetchProductFeatures(); break;
                                case "techspecs": fetchTechSpecs(); break;
                                case "smartfeatures": fetchSmartFeatures(); break;
                                case "techstages": fetchTechStages(); break;
                                case "pricing": fetchPricingPlans(); break;
                                case "productinfo": fetchProductInfo(); break;
                                case "comparison": fetchComparisonPoints(); break;
                                case "whychoose": fetchWhyChoosePoints(); break;
                                case "faqs": fetchFAQs(); break;
                                case "reviews": fetchReviews(); break;
                            }
                        }}
                        className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                        <RefreshCw className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Data Display */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {tabs.find(t => t.id === activeTab)?.label}
                        </h2>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`p-2 rounded ${viewMode === "grid" ? "bg-purple-100 text-purple-600" : "text-gray-400"}`}
                            >
                                <Grid className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={`p-2 rounded ${viewMode === "list" ? "bg-purple-100 text-purple-600" : "text-gray-400"}`}
                            >
                                <List className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
                        </div>
                    ) : getPaginatedData().length === 0 ? (
                        <div className="text-center py-12">
                            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">No items found</p>
                        </div>
                    ) : (
                        <div className={
                            viewMode === "grid"
                                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                                : "space-y-4"
                        }>
                            {getPaginatedData().map((item) => (
                                <div key={item.id}>
                                    {renderItemCard(item)}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {!loading && getFilteredData().length > itemsPerPage && (
                    <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-700 dark:text-gray-300">
                                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, getFilteredData().length)} of {getFilteredData().length} items
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50"
                                >
                                    Previous
                                </button>
                                <span className="px-3 py-1">
                                    Page {currentPage} of {Math.ceil(getFilteredData().length / itemsPerPage)}
                                </span>
                                <button
                                    onClick={() => setCurrentPage(Math.min(Math.ceil(getFilteredData().length / itemsPerPage), currentPage + 1))}
                                    disabled={currentPage === Math.ceil(getFilteredData().length / itemsPerPage)}
                                    className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 flex justify-between items-center">
                            <h2 className="text-xl font-bold">
                                {editingItem ? 'Edit Item' : 'Add New Item'}
                            </h2>
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setImageFiles({});
                                    setImagePreviews({});
                                }}
                                className="text-white hover:text-purple-100"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            {renderFormFields()}
                        </div>

                        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-2">
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setImageFiles({});
                                    setImagePreviews({});
                                }}
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* City Modal */}
            {showCityModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full">
                        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 flex justify-between items-center">
                            <h2 className="text-xl font-bold">Add New City</h2>
                            <button
                                onClick={() => setShowCityModal(false)}
                                className="text-white hover:text-green-100"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    City Name
                                </label>
                                <input
                                    type="text"
                                    value={cityFormData.name}
                                    onChange={(e) => setCityFormData({ ...cityFormData, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Slug (URL-friendly name)
                                </label>
                                <input
                                    type="text"
                                    value={cityFormData.slug}
                                    onChange={(e) => setCityFormData({ ...cityFormData, slug: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                    placeholder="e.g., dhaka"
                                />
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-2">
                            <button
                                onClick={() => setShowCityModal(false)}
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddCity}
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                            >
                                Add City
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}