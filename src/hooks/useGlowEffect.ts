import { useEffect } from "react";

const useGlowEffect = (glowContainer: string, glowCards: string) => {
  useEffect(() => {
    const CONFIG = {
      blur: 20,
      spread: 80,
      opacity: 0,
      proximity: 60,
    };

    const updateMousePosition = (event: MouseEvent) => {
      // Get the angle based on the center point of the card and pointer position
      for (const CARD of glowCardsElement) {
        // Check the card against the proximity and then start updating
        const CARD_BOUNDS = CARD.getBoundingClientRect();
        // Get distance between pointer and outer bounds of card
        if (
          event?.x > CARD_BOUNDS.left - CONFIG.proximity &&
          event?.x < CARD_BOUNDS.left + CARD_BOUNDS.width + CONFIG.proximity &&
          event?.y > CARD_BOUNDS.top - CONFIG.proximity &&
          event?.y < CARD_BOUNDS.top + CARD_BOUNDS.height + CONFIG.proximity
        ) {
          // If within proximity set the active opacity
          CARD.style.setProperty("--active", "1");
        } else {
          CARD.style.setProperty("--active", CONFIG.opacity.toString());
        }
        const CARD_CENTER = [
          CARD_BOUNDS.left + CARD_BOUNDS.width * 0.5,
          CARD_BOUNDS.top + CARD_BOUNDS.height * 0.5,
        ];
        let ANGLE =
          (Math.atan2(event?.y - CARD_CENTER[1], event?.x - CARD_CENTER[0]) *
            180) /
          Math.PI;
        ANGLE = ANGLE < 0 ? ANGLE + 360 : ANGLE;
        CARD.style.setProperty("--start", (ANGLE + 90).toString());
      }
    };

    // Find elements
    const glowContainerElement = document.querySelector(
      glowContainer
    ) as HTMLElement;
    const glowCardsElement = document.querySelectorAll(
      glowCards
    ) as NodeListOf<HTMLElement>;

    // Initialize glow effect
    document.body.addEventListener("pointermove", updateMousePosition);
    glowContainerElement?.style.setProperty("--blur", CONFIG.blur.toString());
    glowContainerElement?.style.setProperty(
      "--spread",
      CONFIG.spread.toString()
    );

    return () => {
      document.body.removeEventListener("pointermove", updateMousePosition);
    };
  }, [glowCards, glowContainer]);
};

export default useGlowEffect;
