/**
 * Created by holma198 on 3/3/17.
 */
import { TestBed, async } from "@angular/core/testing";
import {FlowerComponent} from "./flower.component";

describe("Flower Page", () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [FlowerComponent]
        });
    });

    beforeEach(async(() => {
        TestBed.compileComponents();
    }));

    it("says a message", async(() => {
        const comp = TestBed.createComponent(FlowerComponent);
        expect(comp.componentInstance.text).toBe("More Placeholder Text");
    }));
});