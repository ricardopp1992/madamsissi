
class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.productUrlElement = this.querySelector('.product_carousel__image_link');
    this.sizesVariantElements = this.querySelectorAll('.product_carousel__card_size span') || [];
    this.colorsVariantElements = this.querySelectorAll('.product_carousel__card_colors span.variant-color') || [];
    this.colorSelectedElement = this.querySelector('.product_carousel__card_colors .variant-color.selected');

    this.bindColorVariantClickEvent();
  }

  bindColorVariantClickEvent() {
    this.colorsVariantElements.forEach((colorVariantElement) => {
      colorVariantElement.addEventListener('click', this.handleOnColorSelectedClick.bind(this));
    });
  }

  async handleOnColorSelectedClick(event) {
    const selectedSizeElement = event.currentTarget;

    if (selectedSizeElement.classList.contains('selected')) {
      return;
    }

    this.colorSelectedElement.classList.remove('selected');
    const variantId = selectedSizeElement.dataset.variantId;
    this.colorSelectedElement = selectedSizeElement;

    this.colorSelectedElement.classList.add('selected');

    try {
      const response = await fetch(`${this.productUrlElement.href}?variant=${variantId}&section_id=card-product`);
      const sectionResponse = await response.text();
      const parser = new DOMParser();
      const sectionDocument = parser.parseFromString(sectionResponse, 'text/html');
      const newProductCard = sectionDocument.querySelector('product-card .product_carousel__image_link_variants');
      const oldProductVariant = this.querySelector('product-card .product_carousel__image_link_variants');
      oldProductVariant.replaceWith(newProductCard);
    } catch (error) {
      console.error(error);
    }
  }
}
customElements.define('product-card', ProductCard);