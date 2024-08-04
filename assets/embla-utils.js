function emblaPrevAndNextButtons(emblaApi, emblaPrevButton, emblaNextButton) {
  const togglePrevNextBtnsState = () => {
    if (emblaApi.canScrollPrev()) emblaPrevButton.removeAttribute('disabled')
    else emblaPrevButton.setAttribute('disabled', 'true');

    if (emblaApi.canScrollNext()) emblaNextButton.removeAttribute('disabled')
    else emblaNextButton.setAttribute('disabled', 'true');
  }

  emblaApi
    .on('select', togglePrevNextBtnsState)
    .on('init', togglePrevNextBtnsState)
    .on('reInit', togglePrevNextBtnsState);

  emblaPrevButton.addEventListener('click', emblaApi.scrollPrev);
  emblaNextButton.addEventListener('click', emblaApi.scrollNext);
}

function emblaControlsSetup(emblaApi, dotsNode) {
  let dotNodes = []
  const addDotBtnsWithClickHandlers = () => {
    dotsNode.innerHTML = emblaApi
      .scrollSnapList()
      .map(() => '<button class="embla__dot" type="button"></button>')
      .join('')

    const scrollTo = (index) => {
      emblaApi.scrollTo(index)
    }

    dotNodes = Array.from(dotsNode.querySelectorAll('.embla__dot'))
    dotNodes.forEach((dotNode, index) => {
      dotNode.addEventListener('click', () => scrollTo(index), false)
    })
  }

  const toggleDotBtnsActive = () => {
    const previous = emblaApi.previousScrollSnap()
    const selected = emblaApi.selectedScrollSnap()
    dotNodes[previous].classList.remove('embla__dot--selected')
    dotNodes[selected].classList.add('embla__dot--selected')
  }

  emblaApi
    .on('init', addDotBtnsWithClickHandlers)
    .on('reInit', addDotBtnsWithClickHandlers)
    .on('init', toggleDotBtnsActive)
    .on('reInit', toggleDotBtnsActive)
    .on('select', toggleDotBtnsActive)

  dotsNode.innerHTML = '';
}