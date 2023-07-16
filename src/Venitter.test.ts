import Venitter from "./Venitter";
import { describe, it, expect } from "vitest";

describe("Venitter", () => {
  it("Should register handler", () => {
    const venitter = new Venitter();
    venitter.on("test", () => {
      console.log("test");
    });
    expect(venitter.size).toBe(1);
  });

  it("Should emit with payload", () => {
    const venitter = new Venitter();

    let a = "";
    venitter.on("test", (payload: string) => {
      a = payload;
    });
    venitter.emit("test", "hello");
    expect(a).toBe("hello");
  });

  it("Should once called only once", () => {
    const venitter = new Venitter();

    let called = 0;
    venitter.once("test", () => {
      called += 1;
    });

    venitter.emit("test");
    venitter.emit("test");
    venitter.emit("test");

    expect(called).toBe(1);
  });

  it("Should off handler", () => {
    const venitter = new Venitter();

    let called = 0;
    const handler = () => {
      called += 1;
    };

    venitter.on("test", handler);
    venitter.emit("test");
    venitter.off("test", handler);
    venitter.emit("test");
    expect(called).toBe(1);
  });
});
