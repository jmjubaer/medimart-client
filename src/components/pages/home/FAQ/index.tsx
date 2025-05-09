"use client";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from "react-accessible-accordion";

// Demo styles, see 'Styles' section below for some notes on use.
import "react-accessible-accordion/dist/fancy-example.css";

const FAQPage = () => {
    return (
        <div className='container pb-16'>
            <div className='max-w-3xl mx-auto text-center mb-16'>
                <h2 className='text-3xl md:text-4xl font-bold mb-4 tracking-tight'>
                    Frequently Asked Questions
                </h2>
                <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
                    From product use to delivery details, explore our FAQ
                    section for helpful answers and expert guidance.
                </p>
            </div>
            <div className='sm:w-4/5 sm:text-base text-sm w-full mx-auto text-left'>
                <Accordion preExpanded={["a"]}>
                    <AccordionItem uuid='a'>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <span className='text-base'>
                                    Do I need a prescription to buy certain
                                    products?
                                </span>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>
                                Yes, for some of our products — especially
                                pharmaceutical medicines — a valid prescription
                                from a licensed healthcare provider is required.
                                This is to ensure that the medicine is
                                appropriate and safe for your specific health
                                needs. Products that require a prescription are
                                clearly marked on their product pages. If you`re
                                unsure whether a product needs a prescription,
                                please contact with us.
                            </p>
                        </AccordionItemPanel>
                    </AccordionItem>
                    <AccordionItem uuid='b'>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <span className='text-base'>
                                    Are all your products certified and safe to
                                    use?
                                </span>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>
                                Absolutely. We prioritize customer safety and
                                only source products from reputable and
                                certified manufacturers. All medical equipment
                                and medicines available on our site meet strict
                                industry standards and comply with local and
                                international safety regulations. Whether it’s a
                                basic thermometer or a complex medical
                                instrument, we ensure that each item is
                                reliable, thoroughly tested, and suitable for
                                safe use at home or in clinical settings.
                            </p>
                        </AccordionItemPanel>
                    </AccordionItem>
                    <AccordionItem uuid='c'>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <span className='text-base'>
                                    What is your return or exchange policy?
                                </span>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>
                                Due to health and hygiene regulations, not all
                                items are eligible for return. However, if a
                                product is delivered damaged, defective, or
                                incorrect, we’ll gladly offer a replacement or
                                refund. To initiate a return or exchange, please
                                contact with us within 48 hours of receiving the
                                item, and provide clear images and a brief
                                explanation of the issue. We strive to ensure a
                                smooth and fair resolution process for all valid
                                claims.
                            </p>
                        </AccordionItemPanel>
                    </AccordionItem>
                    <AccordionItem uuid='d'>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <span className='text-base'>
                                    How long does shipping usually take?
                                </span>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>
                                We offer three convenient delivery options to
                                suit your needs:
                                <li className='mt-3 my-1'>
                                    <span className='font-semibold'>
                                        Standard Delivery:
                                    </span>
                                    Typically takes 5–7 business days after your
                                    order has been processed. This is the most
                                    economical option and is suitable for
                                    non-urgent orders.
                                </li>{" "}
                                <li>
                                    <span className='font-semibold'>
                                        Express Delivery:
                                    </span>
                                    Designed for faster service, this option
                                    delivers within 2–3 business days. Ideal if
                                    you need your items quickly.
                                </li>{" "}
                                <li className='my-1 mb-3'>
                                    <span className='font-semibold'>
                                        In-Store Pickup (Pickupro):
                                    </span>
                                    You can choose to pick up your order
                                    directly from our store location. This is a
                                    great option if you prefer to collect your
                                    items at your convenience and avoid shipping
                                    fees.
                                </li>
                                Once your order is confirmed, you’ll receive an
                                email or SMS with your delivery method and a
                                tracking number (if applicable). If you have any
                                questions about delivery times or need help
                                choosing the best option, our support team is
                                here to help.
                            </p>
                        </AccordionItemPanel>
                    </AccordionItem>
                    <AccordionItem uuid='e'>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <span className='text-base'>
                                    What should I do if I receive a damaged
                                    product?
                                </span>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>
                                If your product arrives damaged or defective,
                                please notify us within 48 hours of delivery. Be
                                sure to include clear photographs of the damage
                                and your order details. Our customer service
                                team will assess the issue and work with you to
                                arrange a replacement or issue a refund. We take
                                such cases seriously and strive to resolve them
                                quickly and fairly to ensure your satisfaction.
                            </p>
                        </AccordionItemPanel>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
};
export default FAQPage;
