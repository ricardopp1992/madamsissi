class CollectionNavigationPreview extends HTMLElement {
  constructor() {
    super();
    this.lastHoveredAnchorElement = this.querySelector('.active');
    this.rightImageElement = this.querySelector('.collections-navigation__right-image');
    this.collectionItemListElement = this.querySelectorAll('.collections-navigation__collection-item');

    this.bindHoverEventOnCollectionItems();
  }

  bindHoverEventOnCollectionItems() {
    if (window.screen.width < 1100) {
      this.collectionItemListElement.forEach(collectionItem => collectionItem.addEventListener('touchend', this.handleCollectionItemHover.bind(this)));
    } else {
      this.collectionItemListElement.forEach(collectionItem => collectionItem.addEventListener('mouseover', this.handleCollectionItemHover.bind(this)));
    }
  }

  handleCollectionItemHover(event) {
    const itemElement = event.currentTarget;
    const currentAnchorElement = itemElement.querySelector('a.collections-navigation__collection-content');

    if (!currentAnchorElement.classList.contains('active') && event.type === 'touchend') {
      event.preventDefault();
    }

    this.lastHoveredAnchorElement.classList.remove('active');
    currentAnchorElement.classList.add('active');
    this.lastHoveredAnchorElement = currentAnchorElement;

    const imageDataHolder = itemElement.querySelector('.image-holder');
    this.rightImageElement.setAttribute('srcset', imageDataHolder.dataset['imageSrcset']);
    this.rightImageElement.setAttribute('src', imageDataHolder.dataset['imageSrc']);
    this.rightImageElement.setAttribute('height', imageDataHolder.dataset['imageHeight']);
  }
}
customElements.define('collection-navigation-preview', CollectionNavigationPreview);