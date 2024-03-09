import { ScrollView } from "react-native";

import { Section, Type } from "@components/styled";

const Terms = () => {
    return (
        <ScrollView className="px-6 ">
            <Section stylize="my-10">
                <Type weight="medium" stylize="text-titleMedium text-onSurface">
                    These Terms and Conditions ("Terms") govern your access and use of the Layers mobile application ("App"). By accessing or using the App, you agree to be bound by these Terms. If you disagree with any part of these Terms, you may not access or use the App.
                </Type>

                <Section stylize="mt-10">
                    <Type stylize="text-titleLarge text-onSurface">1. Eligibility</Type>
                    <Type weight="medium" stylize="text-titleSmall text-onSurfaceVariant mt-5">You must be at least 15 years old to use the App. By using the App, you represent and warrant that you are at least 15 years old and meet all other eligibility requirements under these Terms.</Type>
                </Section>

                <Section stylize="mt-5">
                    <Type stylize="text-titleLarge text-onSurface">2. User Accounts</Type>
                    <Type weight="medium" stylize="text-titleSmall text-onSurfaceVariant mt-5">You may register for an account on the App ("Account"). You are responsible for maintaining the confidentiality of your account information, including your password, and for all activity that occurs under your account. You agree to notify Layers immediately of any unauthorized use of your account or any other security breach.</Type>
                </Section>

                <Section stylize="mt-5">
                    <Type stylize="text-titleLarge text-onSurface">3. Content and Conduct</Type>
                    <Type weight="medium" stylize="text-titleSmall text-onSurfaceVariant mt-5">You are solely responsible for the content you submit to the App ("User Content"). You agree not to submit any User Content that is:</Type>

                    <Type weight="medium" stylize="text-titleSmall text-onSurfaceVariant mt-5 ml-3">{'\u2022'} Illegal, harmful, threatening, abusive, harassing, defamatory, obscene, hateful, or racially or ethnically offensive.</Type>
                    <Type weight="medium" stylize="text-titleSmall text-onSurfaceVariant mt-3 ml-3">{'\u2022'} Violates any intellectual property rights of any third party.</Type>
                    <Type weight="medium" stylize="text-titleSmall text-onSurfaceVariant mt-3 ml-3">{'\u2022'} Encourages or promotes any illegal activity.</Type>
                    <Type weight="medium" stylize="text-titleSmall text-onSurfaceVariant mt-3 ml-3">{'\u2022'} Violates the privacy of any third party.</Type>
                    
                    <Type weight="medium" stylize="text-titleSmall text-onSurfaceVariant mt-5">Layers reserves the right, but does not assume any obligation, to remove any User Content that violates these Terms or is otherwise deemed inappropriate.</Type>
                </Section>

                <Section stylize="mt-5">
                    <Type stylize="text-titleLarge text-onSurface">4. Disclaimers</Type>
                    <Type weight="medium" stylize="text-titleSmall text-onSurfaceVariant mt-5">The App, all information and content contained therein, and the services provided are offered on an "as is" and "as available" basis. Layers makes no representations or warranties of any kind, express or implied, with respect to the operation of the App, the information, content, materials, or products included on the App, or the accuracy, completeness, reliability, availability, or timeliness of any such information, content, materials, or products.</Type>
                    <Type weight="medium" stylize="text-titleSmall text-onSurfaceVariant mt-5">Layers does not provide any medical or therapeutic advice. The information and content on the App is not intended to be a substitute for professional medical advice, diagnosis, or treatment. You should always consult with a qualified healthcare professional before making any decisions about your mental health. Layers does not guarantee that the App will be uninterrupted or error-free. Layers is not responsible for any damages arising out of your use of the App.</Type>
                </Section>

                <Section stylize="mt-5">
                    <Type stylize="text-titleLarge text-onSurface">5. Monetization and Advertising</Type>
                    <Type weight="medium" stylize="text-titleSmall text-onSurfaceVariant mt-5">Layers is completely free. We do not sell anything on the platform, including subscriptions, products, or services. We also do not display any third-party advertisements on the App. Our platform does not link to any external websites that we do not own or operate.</Type>
                </Section>

                <Section stylize="mt-5">
                    <Type stylize="text-titleLarge text-onSurface">6. AI and User Data</Type>
                    <Type weight="medium" stylize="text-titleSmall text-onSurfaceVariant mt-5">Our AI features, including the chatbot and score analysis, use your data to personalize your experience and provide you with relevant support. Your interactions with the AI, including your assessment answers, daily checkups, mood logs, journals, and helper chats, are used to train and improve the AI. We take steps to anonymize and aggregate your data whenever possible. We will never share your personal information with any third-party AI developers or companies without your explicit consent.</Type>
                </Section>

                <Section stylize="mt-5">
                    <Type stylize="text-titleLarge text-onSurface">7. Copyright Infringement</Type>
                    <Type weight="medium" stylize="text-titleSmall text-onSurfaceVariant mt-5">If you believe that your copyright work has been infringed upon by Layers or a user of the App, please follow our notice and takedown procedure by submitting a written notification to our designated agent at broken.contact.1211@gmail.com. The notification must include the following information:</Type>

                    <Type weight="medium" stylize="text-titleSmall text-onSurfaceVariant mt-5 ml-3">{'\u2022'} An electronic or physical signature of the owner of the copyrighted work or a person authorized to act on their behalf.</Type>
                    <Type weight="medium" stylize="text-titleSmall text-onSurfaceVariant mt-3 ml-3">{'\u2022'} A description of the copyrighted work that you claim has been infringed.</Type>
                    <Type weight="medium" stylize="text-titleSmall text-onSurfaceVariant mt-3 ml-3">{'\u2022'} A description of the location on the App where the infringing work is located.</Type>
                    <Type weight="medium" stylize="text-titleSmall text-onSurfaceVariant mt-3 ml-3">{'\u2022'} Your address, telephone number, and email address.</Type>
                    <Type weight="medium" stylize="text-titleSmall text-onSurfaceVariant mt-3 ml-3">{'\u2022'} A statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law.</Type>
                    <Type weight="medium" stylize="text-titleSmall text-onSurfaceVariant mt-3 ml-3">{'\u2022'} A statement by you, made under penalty of perjury, that the information in the notification is accurate and that you are the copyright owner or authorized to act on the copyright owner's behalf.</Type>
                </Section>

                <Section stylize="mt-5">
                    <Type stylize="text-titleLarge text-onSurface">8. Industry-Specific Laws</Type>
                    <Type weight="medium" stylize="text-titleSmall text-onSurfaceVariant mt-5">Layers is committed to complying with all applicable laws and regulations, including but not limited to:</Type>

                    <Type weight="medium" stylize="text-titleSmall text-onSurfaceVariant mt-5 ml-3">{'\u2022'} Children's Online Privacy Protection Act (COPPA): We comply with COPPA by restricting access to users under the age of 15 and obtaining parental consent for users under 18 (if applicable in your jurisdiction).</Type>
                    <Type weight="medium" stylize="text-titleSmall text-onSurfaceVariant mt-3 ml-3">{'\u2022'} Health Insurance Portability and Accountability Act (HIPAA): While Layers does not provide medical services, we take steps to protect the privacy and security of user information in accordance with HIPAA guidelines.</Type>
                    <Type weight="medium" stylize="text-titleSmall text-onSurfaceVariant mt-3 ml-3">{'\u2022'} General Data Protection Regulation (GDPR): If you are located in the European Economic Area (EEA), we comply with GDPR by obtaining your consent for the collection and processing of your personal information and providing you with control over your data.</Type>
                </Section>

                <Section stylize="mt-5">
                    <Type stylize="text-titleLarge text-onSurface">9. Termination</Type>
                    <Type weight="medium" stylize="text-titleSmall text-onSurfaceVariant mt-5">Layers may terminate your access to the App at any time, for any reason, and without notice. You may also terminate your account at any time.</Type>
                </Section>

                <Section stylize="mt-5">
                    <Type stylize="text-titleLarge text-onSurface">10. Governing Law</Type>
                    <Type weight="medium" stylize="text-titleSmall text-onSurfaceVariant mt-5">These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.</Type>
                </Section>

                <Section stylize="mt-5">
                    <Type stylize="text-titleLarge text-onSurface">11. Changes to these Terms</Type>
                    <Type weight="medium" stylize="text-titleSmall text-onSurfaceVariant mt-5">We reserve the right to modify or update these Terms at any time by posting the revised Terms in the App. Your continued use of the App after any such changes constitutes your acceptance of the revised Terms.</Type>
                </Section>

                <Section stylize="mt-5">
                    <Type stylize="text-titleLarge text-onSurface">12. Contact Us</Type>
                    <Type weight="medium" stylize="text-titleSmall text-onSurfaceVariant mt-5">If you have any questions, concerns, or feedback regarding these Terms, please contact us at broken.contact.1211@gmail.com.</Type>
                </Section>
            </Section>
        </ScrollView>
    );
}
 
export default Terms;
