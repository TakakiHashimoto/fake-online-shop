type Props = {
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    imgUrl: string;
    stock: number;
  };
};

function ProductCard({ product }: Props) {
  const { imgUrl, name, description, price, stock } = product;
  return (
    <div className="group bg-surface-container-low border border-outline-variant/20 rounded-xl overflow-hidden hover:border-primary-fixed-dim/50 transition-all duration-300 flex flex-col">
      <div className="relative h-64 overflow-hidden">
        <img
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
          data-alt="A macro shot of vibrant, translucent blue crystals arranged on a dark metallic surface. The crystals glow from within with a neon cyan light, casting sharp reflections on the surrounding blackened industrial environment. The aesthetic is gritty yet high-tech, using a cyberpunk color palette of deep navy and electric teal with high contrast and sharp focus."
          src={imgUrl}
        />
        <div className="absolute top-sm left-sm px-xs py-0.5 bg-primary-container text-on-primary-container font-label-mono text-[10px] font-bold rounded">
          PURITY: 99.1%
        </div>
      </div>
      <div className="p-md flex flex-col flex-1">
        <span className="font-label-mono text-[10px] text-secondary tracking-widest uppercase mb-xs">
          Alchemical
        </span>
        <h3 className="font-headline-md text-headline-md text-on-background mb-base group-hover:text-primary-fixed-dim transition-colors">
          {name}
        </h3>
        <div className="flex items-center justify-between mt-auto pt-md">
          <span className="font-label-mono text-headline-md text-primary-fixed-dim">
            {price}
          </span>
          <span className="text-[10px] text-on-surface-variant font-label-mono uppercase">
            Batch: #737-04
          </span>
        </div>
        <div className="mt-md space-y-xs">
          <div className="flex justify-between text-[10px] font-label-mono text-on-surface-variant">
            <span>STOCK_INTEGRITY</span>
            <span>CRITICAL (12%)</span>
          </div>
          <div className="h-1 bg-surface-container-highest rounded-full overflow-hidden">
            <div className="h-full w-[12%] bg-error scanning-animation"></div>
          </div>
        </div>
        <button className="w-full mt-md py-sm bg-primary-container text-on-primary-container font-headline-md text-[14px] font-black bloom-primary transition-all active:scale-95 uppercase">
          ADD_TO_CART
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
