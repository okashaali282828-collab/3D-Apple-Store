// Trade-In Section State (Isko Navbar component ke andar top par state mein add karein)
const [hasTradeIn, setHasTradeIn] = useState(false);

// Trade-in discount value (e.g., $50 off)
const tradeInDiscount = hasTradeIn ? 50 : 0;
const calculatedTotalPrice = (selectedFinishes.length * 249) - tradeInDiscount;