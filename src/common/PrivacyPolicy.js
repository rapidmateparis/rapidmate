import React from 'react';
import {View, Text, ScrollView, StyleSheet, Linking} from 'react-native';
import {colors} from '../colors';

const PrivacyPolicy = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <View style={styles.card}>
          <Text style={styles.title}>
            Privacy <Text style={styles.highlight}>Policy</Text>
          </Text>
          <Text style={styles.date}>
            Last Updated: <Text style={styles.highlight}>January 4, 2025</Text>
          </Text>
          <Text style={styles.paragraph}>
            Rapidmate ("we," "us," "our") is committed to protecting your data.
            This Privacy Policy explains how we collect, use, share, and protect
            your data and describes your rights under applicable laws, including
            the General Data Protection Regulation (GDPR).
          </Text>
          <Text style={styles.paragraph}>
            Please review this policy regularly, as it may be updated
            periodically.
          </Text>

          <Text style={styles.sectionTitle}>1. Who We Are</Text>
          <Text style={styles.paragraph}>
            Rapidmate provides logistics services, connecting businesses with
            delivery professionals to ensure fast and reliable deliveries across
            France. For questions or concerns about your data, contact us at:
          </Text>
          <Text style={styles.contact}>
            Email:{' '}
            <Text
              style={styles.highlight}
              onPress={() => Linking.openURL('mailto:contact@rapidmate.fr')}>
              contact@rapidmate.fr
            </Text>
          </Text>
          <Text style={styles.contact}>
            Postal Address:{' '}
            <Text style={styles.highlight}>
              8 B Av. Danielle Casanova ,95210 Saint -Gratien
            </Text>
          </Text>

          <Text style={styles.sectionTitle}>2. Data We Collect</Text>
          <Text style={styles.subSectionTitle}>2.1. From Website Visitors</Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Data Collected:</Text> IP address, browser
            type, cookies, and information provided via contact forms (name,
            email, phone number).
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Purpose:</Text> Website functionality,
            responding to inquiries, analytics, and marketing.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Lawful Basis:</Text> Consent (for cookies)
            and legitimate interests (analytics and communication).
          </Text>

          <Text style={styles.subSectionTitle}>
            2.2. From Registered Users (Businesses/Customers)
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Data Collected:</Text>
          </Text>
          <Text style={styles.paragraph}>
            Personal identifiers (name, email, phone number, address).
          </Text>
          <Text style={styles.paragraph}>
            Payment details (processed securely via third-party providers).
          </Text>
          <Text style={styles.paragraph}>
            Delivery information (pickup and drop-off addresses, item
            descriptions).
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Purpose: </Text>Service delivery, billing,
            customer support, and dispute resolution.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Lawful Basis: </Text>Contractual necessity
            and legitimate interests.
          </Text>
          <Text style={styles.sectionTitle}>2.3. From Couriers:</Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Data Collected:</Text>
          </Text>
          <Text style={styles.paragraph}>
            Personal identifiers (name, email, phone number, vehicle details).
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>SIRET number </Text> (for individual
            entrepreneurs/self-employed couriers).
          </Text>
          <Text style={styles.paragraph}>
            Financial details (bank account for payments).
          </Text>
          <Text style={styles.paragraph}>
            Geolocation data (during active delivery periods).
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Purpose: </Text>Identity verification,
            assignment of delivery tasks, payment processing, and safety and
            Verification of delivery professional identity through photo
            capture, ensuring the authenticity and security of the individual
            handling the delivery.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Lawful Basis: </Text>Contractual
            necessity, legal obligations, and legitimate interests.
          </Text>
          <Text style={styles.sectionTitle}>
            2.4. Cookies and Tracking Technologies
          </Text>
          <Text style={styles.paragraph}>
            We use cookies to enhance your experience on our website. Cookies
            are small text files that help us remember your preferences, improve
            functionality, and provide analytics about website usage.
          </Text>
          <Text style={styles.paragraph}>
            For more details about how we use cookies and how you can control
            them, please refer to our Terms & Conditions.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Lawful Basis: </Text>Consent (for
            non-essential cookies).
          </Text>
          <Text style={styles.paragraph}>
            We rely on your consent to use non-essential cookies. You have the
            right to withdraw or modify your consent at any time through your
            browser settings or the cookie preferences provided.
          </Text>
          <Text style={styles.paragraph}>
            By continuing to use our website, you consent to the use of
            non-essential cookies unless you opt-out using the options provided.
          </Text>
          <Text style={styles.sectionTitle}>3. How We Use Your Data</Text>
          <Text style={styles.paragraph}>
            We use your personal data for the following purposes:
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>1. Service Provision:</Text> To process
            orders, assign deliveries, and ensure timely logistics operations.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>2. Customer Support:</Text> To address
            inquiries, complaints, and disputes.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>3. Marketing:</Text> To send promotional
            materials (with your consent).
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>4. Analytics:</Text> To improve our
            services through usage data analysis.
          </Text>
          <Text style={styles.sectionTitle}>4. Data Sharing</Text>
          <Text style={styles.paragraph}>We may share your data with:</Text>
          <Text style={styles.listItem}>
            <Text style={styles.bold}>Service Providers:</Text> For hosting,
            payment processing, and customer communication. These providers
            include [Service Providers' Names], who ensure GDPR compliance and
            data protection.
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.bold}>Couriers:</Text> Limited data (e.g.,
            delivery addresses) necessary for completing deliveries.
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.bold}>Legal Authorities:</Text> As required by
            law, including for tax and regulatory compliance.
          </Text>
          <Text style={styles.paragraph}>
            Rapidmate does not sell your personal data to third parties.
          </Text>

          <Text style={styles.sectionTitle}>
            5. International Data Transfers
          </Text>
          <Text style={styles.paragraph}>
            If your data is transferred outside the European Economic Area
            (EEA), we ensure compliance with GDPR through appropriate
            safeguards, such as standard contractual clauses or equivalent
            measures. For example, we use [Service Provider Names] for
            hosting/payment processing, which adhere to GDPR-compliant data
            protection practices.
          </Text>

          <Text style={styles.sectionTitle}>6. Data Retention</Text>
          <Text style={styles.paragraph}>
            We retain personal data for the following periods, which are aligned
            with our operational and legal needs:
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.bold}>Customer Data:</Text> Retained up to 3
            years after your last activity on the platform. This ensures we have
            a complete record of our transactions for customer support and legal
            compliance.
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.bold}>Courier Data:</Text> Retained up to 5
            years after account deactivation, in line with legal requirements
            related to labor and transportation regulations.
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.bold}>Payment Records:</Text> Retained for 10
            years to comply with tax and financial regulations.
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.bold}>Cookies and Analytics:</Text> Data is
            retained for up to 1 year for tracking and improving our website and
            services.
          </Text>

          <Text style={styles.sectionTitle}>7. Security Measures</Text>
          <Text style={styles.paragraph}>
            We employ robust technical and organizational measures to protect
            your data, including:
          </Text>
          <Text style={styles.listItem}>Encryption of sensitive data.</Text>
          <Text style={styles.listItem}>
            Restricted access to personal data.
          </Text>
          <Text style={styles.listItem}>
            Regular audits and breach response procedures.
          </Text>

          <Text style={styles.sectionTitle}>8. Your Rights</Text>
          <Text style={styles.paragraph}>
            Under GDPR, you have the following rights:
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.bold}>Access:</Text> Request a copy of the
            personal data we hold about you.
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.bold}>Rectification:</Text> Correct inaccurate
            or incomplete data.
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.bold}>Erasure:</Text> Request deletion of your
            data, subject to legal and contractual obligations.
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.bold}>Restriction:</Text> Limit processing of
            your data under specific circumstances.
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.bold}>Portability:</Text> Transfer your data to
            another service provider.
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.bold}>Objection:</Text> Object to data
            processing based on legitimate interests.
          </Text>
          <Text style={styles.paragraph}>
            To exercise your rights, contact us at: contact@rapidmate.fr
          </Text>

          <Text style={styles.sectionTitle}>9. Complaints</Text>
          <Text style={styles.paragraph}>
            If you believe your data rights have been violated, we encourage you
            to first reach out to <Text style={styles.bold}>Rapidmate</Text>{' '}
            directly to address and resolve the issue. You can contact us via
            email at{' '}
            <Text
              style={styles.highlight}
              onPress={() => Linking.openURL('mailto:contact@rapidmate.fr')}>
              contact@rapidmate.fr
            </Text>
          </Text>
          <Text style={styles.paragraph}>
            If your concerns are not resolved to your satisfaction, you have the
            right to file a complaint with:
          </Text>
          <Text style={styles.listItem}>
            Commission Nationale de l'Informatique et des Libertés (CNIL) via{' '}
            <Text
              style={styles.link}
              onPress={() => Linking.openURL('https://www.cnil.fr')}>
              cnil.fr
            </Text>
          </Text>

          <Text style={styles.sectionTitle}>10. Automated Decision-Making</Text>
          <Text style={styles.paragraph}>
            We do not use your data for automated decision-making or profiling.
            However, we may use data for logistical purposes, such as assigning
            deliveries to the appropriate couriers, which is not considered
            automated decision-making under GDPR.
          </Text>

          <Text style={styles.sectionTitle}>11. Children’s Privacy</Text>
          <Text style={styles.paragraph}>
            Our services are not directed towards individuals under the age of
            16. We do not knowingly collect or process personal data from
            children. If we become aware that we have inadvertently collected
            personal data from a child without appropriate consent, we will take
            steps to delete such information promptly.
          </Text>

          <Text style={styles.sectionTitle}>12. Updates to This Policy</Text>
          <Text style={styles.paragraph}>
            This Privacy Policy may be updated periodically. The latest version
            will always be available on our website, and any significant changes
            will be communicated to you via email or through notifications.
          </Text>
          <Text style={styles.date}>
            Last Updated: <Text style={styles.highlight}>January 4, 2025</Text>
          </Text>

          <Text style={styles.sectionTitle}>Contact Information</Text>
          <Text style={styles.paragraph}>
            For any questions about this Privacy Policy, contact us at:
          </Text>
          <Text style={styles.contact}>
            Email:{' '}
            <Text
              style={styles.highlight}
              onPress={() => Linking.openURL('mailto:contact@rapidmate.fr')}>
              contact@rapidmate.fr
            </Text>
          </Text>
          <Text style={styles.contact}>
            Postal Address:{' '}
            <Text style={styles.highlight}>
              8 B Av. Danielle Casanova ,95210 Saint -Gratien
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    padding: 20,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.text,
  },
  highlight: {
    color: colors.secondary,
  },
  date: {
    fontSize: 16,
    marginBottom: 20,
    color: colors.text,
  },
  paragraph: {
    fontSize: 14,
    marginBottom: 10,
    lineHeight: 20,
    color: colors.text,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: colors.text,
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    color: colors.text,
  },
  bold: {
    fontWeight: 'bold',
  },
  contact: {
    fontSize: 14,
    marginBottom: 10,
    color: colors.text,
  },
  listItem: {
    fontSize: 14,
    marginBottom: 10,
    lineHeight: 20,
    color: colors.text,
  },
});

export default PrivacyPolicy;
