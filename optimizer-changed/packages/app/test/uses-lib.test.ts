import { expect, test } from "vitest";
import { helper } from "@repro/lib";

test("uses lib", () => expect(helper()).toBe(1));
