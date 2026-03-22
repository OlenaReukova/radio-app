import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { EqualizerBars } from "./EqualizerBars";

describe("EqualizerBars", () => {
  describe("structure", () => {
    it("renders 4 bars", () => {
      const { container } = render(<EqualizerBars playing={false} />);
      expect(container.firstElementChild?.children).toHaveLength(4);
    });

    it("sets aria-hidden on the container", () => {
      const { container } = render(<EqualizerBars playing={false} />);
      expect(container.firstElementChild?.getAttribute("aria-hidden")).toBe(
        "true",
      );
    });

    it("forwards className to the container", () => {
      const { container } = render(
        <EqualizerBars playing={false} className="extra" />,
      );
      expect(container.firstElementChild?.className).toContain("extra");
    });
  });

  describe("playing={true}", () => {
    it("adds animate-equalizer class to each bar", () => {
      const { container } = render(<EqualizerBars playing={true} />);
      const bars = Array.from(container.firstElementChild?.children ?? []);
      bars.forEach((bar) => {
        expect(bar.className).toContain("animate-equalizer");
      });
    });

    it("does not freeze bars with inline scaleY(0.5)", () => {
      const { container } = render(<EqualizerBars playing={true} />);
      const bars = Array.from(
        container.firstElementChild?.children ?? [],
      ) as HTMLElement[];
      bars.forEach((bar) => {
        expect(bar.style.transform).not.toBe("scaleY(0.5)");
      });
    });
  });

  describe("playing={false}", () => {
    it("does not add animate-equalizer class to bars", () => {
      const { container } = render(<EqualizerBars playing={false} />);
      const bars = Array.from(container.firstElementChild?.children ?? []);
      bars.forEach((bar) => {
        expect(bar.className).not.toContain("animate-equalizer");
      });
    });

    it("freezes each bar at scaleY(0.5) via inline style", () => {
      const { container } = render(<EqualizerBars playing={false} />);
      const bars = Array.from(
        container.firstElementChild?.children ?? [],
      ) as HTMLElement[];
      bars.forEach((bar) => {
        expect(bar.style.transform).toBe("scaleY(0.5)");
      });
    });
  });

  describe("animation delays", () => {
    it("applies staggered animationDelay to the four bars", () => {
      const { container } = render(<EqualizerBars playing={true} />);
      const bars = Array.from(
        container.firstElementChild?.children ?? [],
      ) as HTMLElement[];
      expect(bars[0].style.animationDelay).toBe("0s");
      expect(bars[1].style.animationDelay).toBe("0.15s");
      expect(bars[2].style.animationDelay).toBe("0.3s");
      expect(bars[3].style.animationDelay).toBe("0.15s");
    });
  });

  describe("size variants", () => {
    it("applies sm size classes to container and bars", () => {
      const { container } = render(<EqualizerBars playing={false} size="sm" />);
      const wrapper = container.firstElementChild as HTMLElement;
      expect(wrapper.className).toContain("h-3");
      expect(wrapper.children[0].className).toContain("w-[2px]");
    });

    it("applies md size classes by default", () => {
      const { container } = render(<EqualizerBars playing={false} />);
      const wrapper = container.firstElementChild as HTMLElement;
      expect(wrapper.className).toContain("h-4");
      expect(wrapper.children[0].className).toContain("w-[3px]");
    });

    it("applies lg size classes to container and bars", () => {
      const { container } = render(<EqualizerBars playing={false} size="lg" />);
      const wrapper = container.firstElementChild as HTMLElement;
      expect(wrapper.className).toContain("h-6");
      expect(wrapper.children[0].className).toContain("w-[4px]");
    });
  });
});
