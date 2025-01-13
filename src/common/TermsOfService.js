import React from 'react';
import {ScrollView, Text, View, StyleSheet, Linking} from 'react-native';
import {colors} from '../colors';

const TermsAndConditions = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        Terms & Conditions for <Text style={styles.highlight}>Rapidmate</Text>
      </Text>
      <Text style={styles.subtitle}>
        Effective Date: <Text style={styles.highlight}>02/01/2025</Text>
      </Text>
      <Text style={styles.subtitle}>
        Last Updated: <Text style={styles.highlight}>02/01/2025</Text>
      </Text>

      <Text style={styles.heading}>1. General Provisions</Text>

      <Text style={styles.subheading}>1.1 Introduction:</Text>
      <Text style={styles.bold}>
        Introduction: Rapidmate is a division/brand of AJS Group, a company
        registered in Pontoise registry, with company registration number SIRET:
        92270101600011. All services provided by Rapidmate are under the legal
        and financial responsibility of AJS Group.
      </Text>
      <Text style={styles.bold}>
        Rapidmate provides a technology platform connecting businesses and
        individuals (referred to as "Users") with freelance delivery
        professionals ("Couriers") to offer scalable, reliable, and eco-friendly
        logistics services across France.
      </Text>
      <Text style={styles.paragraph}>
        Rapidmate provides a technology platform connecting businesses and
        individuals (referred to as "Users") with freelance delivery
        professionals ("Couriers") to offer scalable, reliable, and eco-friendly
        logistics services across France.
      </Text>

      <Text style={styles.subheading}>1.2 Definitions</Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>“User”:</Text> Any individual or entity that
          books delivery services through the Rapidmate platform.
        </Text>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>“Courier”:</Text> A freelance professional
          registered on the platform to fulfill delivery requests.
        </Text>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>“Platform”:</Text> The technology systems,
          including the website and app, through which services are accessed.
        </Text>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>“Service”:</Text> Refers to all logistics,
          delivery, and cleaning solutions provided by Rapidmate, including but
          not limited to transportation, delivery from businesses to end
          customers, package handling, route optimization, multi-tasking
          personnel, cleaning services, and any other related services offered
          by Rapidmate.
        </Text>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>“Goods”:</Text> Items being transported,
          excluding prohibited items outlined in Section 7.
        </Text>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>“Fee”:</Text> Refers to the amount payable
          for the services provided by Rapidmate. Currently, no additional fees
          are charged for delivery services, waiting, or cancellations. Any
          future changes or additional fees will be communicated to clients in
          advance.
        </Text>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>“Force Majeure”:</Text> Events beyond
          reasonable control, including natural disasters, strikes, or
          government actions.
        </Text>
      </View>

      <Text style={styles.subheading}>1.3 Acceptance of Terms</Text>
      <Text style={styles.paragraph}>
        By accessing or using the Rapidmate Platform, Users and Couriers agree
        to these Terms & Conditions. Non-compliance may lead to account
        suspension or termination.
      </Text>

      <Text style={styles.subheading}>1.4 Geographical Scope</Text>
      <Text style={styles.paragraph}>
        Rapidmate operates exclusively within France, covering all regions for
        delivery services.
      </Text>

      <Text style={styles.heading}>2. Services Provided</Text>
      <Text style={styles.subheading}>2.1 For Users</Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>Delivery Types:</Text> Rapidmate facilitates
          on-demand deliveries, scheduled deliveries, and multi-address drops
          for B2B and B2C services.
        </Text>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>Booking:</Text> Users can request services
          via the app or website by providing accurate pickup and delivery
          information.
        </Text>
      </View>

      <Text style={styles.subheading}>2.2 For Couriers</Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>Opportunities:</Text> The platform offers
          Couriers flexible opportunities to accept and fulfill delivery
          requests.
        </Text>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>Payment:</Text> Couriers earn income per
          completed delivery, with bonuses for high performance or
          sustainability contributions (e.g., electric vehicle use).
        </Text>
      </View>

      <Text style={styles.subheading}>2.3 Platform Facilitation</Text>
      <Text style={styles.paragraph}>
        Rapidmate acts as an intermediary, facilitating connections between
        Users and Couriers. Rapidmate does not directly provide delivery
        services or act as an employer of Couriers.
      </Text>

      <Text style={styles.heading}>3. User Obligations</Text>
      <Text style={styles.subheading}>3.1 Accurate Information</Text>
      <Text style={styles.paragraph}>
        Users must provide correct and complete details for pickup and delivery
        addresses.
      </Text>

      <Text style={styles.subheading}>3.2 Packaging Requirements</Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          Goods must be securely packaged to withstand standard delivery
          handling.
        </Text>
        <Text style={styles.listItem}>
          Prohibited items (Section 7) must not be included in deliveries.
        </Text>
      </View>

      <Text style={styles.subheading}>3.3 Service Fees</Text>
      <Text style={styles.paragraph}>
        Users agree to pay all applicable fees, including waiting charges and
        late cancellation penalties, as outlined in the pricing structure.
      </Text>

      <Text style={styles.subheading}>3.4 Compliance with Laws</Text>
      <Text style={styles.paragraph}>
        Users must ensure that all Goods comply with applicable French laws,
        including restrictions on hazardous or illegal items.
      </Text>

      <Text style={styles.heading}>4. Courier Obligations</Text>
      <Text style={styles.subheading}>4.1 Eligibility</Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          Couriers must be at least 18 years old, possess valid identification,
          and, where applicable, a valid driver’s license.
        </Text>
        <Text style={styles.listItem}>
          Couriers using vehicles must ensure they are roadworthy, insured, and
          meet all legal standards.
        </Text>
      </View>

      <Text style={styles.subheading}>4.2 Delivery Conduct</Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          Couriers are required to act professionally, comply with traffic laws,
          and handle Goods with care.
        </Text>
        <Text style={styles.listItem}>
          Misconduct, including delayed or incomplete deliveries, may result in
          account suspension.
        </Text>
      </View>

      <Text style={styles.subheading}>4.3 Equipment</Text>
      <Text style={styles.paragraph}>
        Couriers must use appropriate equipment (e.g., insulated bags for
        perishable items) as specified for certain delivery types.
      </Text>

      <Text style={styles.subheading}>4.4 Performance Standards</Text>
      <Text style={styles.paragraph}>
        Couriers are expected to maintain high service standards, including
        on-time deliveries and adherence to User instructions.
      </Text>

      <Text style={styles.heading}>
        5. Pricing, Payments, and Cancellations
      </Text>
      <Text style={styles.subheading}>5.1 Pricing</Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          Service fees are calculated based on delivery type, distance, and
          additional requirements (e.g., waiting time, multi-address drops).
        </Text>
        <Text style={styles.listItem}>
          Fees are displayed upfront before confirmation.
        </Text>
      </View>

      <Text style={styles.subheading}>5.2 Payments</Text>
      <Text style={styles.paragraph}>
        Payments for services rendered are processed through the Rapidmate
        Platform. Couriers are typically paid on a{' '}
        <Text style={styles.bold}>weekly basis</Text> for completed deliveries.
        However, in specific cases, exceptions may apply:
      </Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>Shift-Based Payments:</Text> Couriers booked
          on a shift basis may have the option to receive payments weekly or
          monthly, based on the terms agreed upon during booking.
        </Text>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>Admin-Approved Exceptions:</Text> Rapidmate
          reserves the right to offer flexibility in payment schedules, subject
          to approval by the administrative team.
        </Text>
        <Text style={styles.listItem}>
          Users must pay via the app or website; direct payments to Couriers are
          prohibited.
        </Text>
      </View>
      <Text style={styles.paragraph}>
        Rapidmate maintains all records related to completed deliveries and
        shifts to ensure accurate payment calculations. Any disputes related to
        payments must be raised by Couriers within{' '}
        <Text style={styles.bold}>7 days</Text> of receiving the payment.
      </Text>

      <Text style={styles.subheading}>5.3 Cancellations</Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          Users can cancel orders free of charge if done before a Courier is
          dispatched.
        </Text>
        <Text style={styles.listItem}>
          Late cancellations may incur fees to compensate the assigned Courier.
        </Text>
      </View>

      <Text style={styles.subheading}>6. Liability</Text>
      <Text style={styles.subheading}>6.1 User Liability</Text>
      <Text style={styles.paragraph}>
        Users are liable for ensuring the legality and safety of Goods
        transported.
      </Text>
      <Text style={styles.subheading}>6.2 Courier Liability</Text>
      <Text style={styles.paragraph}>
        Couriers are liable for damages resulting from negligence or intentional
        misconduct.
      </Text>
      <Text style={styles.subheading}>6.3 Rapidmate Liability</Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>
            Rapidmate is not liable for delays, losses, or damages caused by
            User-provided misinformation, traffic disruptions, or Force Majeure.
          </Text>
        </Text>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>
            Claims must be submitted within 48 hours of delivery for review.
          </Text>
        </Text>
      </View>

      <Text style={styles.subheading}>7. Prohibited Items</Text>
      <Text style={styles.paragraph}>
        The following items are strictly prohibited from being included in
        deliveries handled by Rapidmate. By using our services, you agree not to
        ship or request the transport of the items listed below:
      </Text>

      <Text style={styles.subheading}>7.1 Hazardous Materials</Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>
            Flammable, explosive, or combustible substances,
          </Text>{' '}
          such as gasoline, lighter fluid, or fireworks.
        </Text>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>
            Toxic, corrosive, or radioactive materials,
          </Text>{' '}
          including certain chemicals, batteries, or materials marked as
          hazardous under French law.
        </Text>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>Weapons, ammunition,</Text> or any items
          classified as dangerous by relevant authorities.
        </Text>
      </View>

      <Text style={styles.subheading}>7.2 Illegal Items</Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>Any items that are illegal</Text> under
          French law or international regulations, including counterfeit goods,
          narcotics, or stolen property.
        </Text>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>
            Goods violating intellectual property laws,
          </Text>{' '}
          such as pirated media or unlicensed merchandise.
        </Text>
      </View>

      <Text style={styles.subheading}>7.3 Perishable Goods</Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>
            Perishable items require specific temperature control
          </Text>{' '}
          unless explicitly agreed upon in advance and packaged according to our
          guidelines.
        </Text>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>Food, beverages, or other perishables</Text>{' '}
          that may spoil or pose health risks during transit.
        </Text>
      </View>

      <Text style={styles.subheading}>7.4 Restricted or Regulated Items</Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>
            Medicines, medical devices, or pharmaceutical products
          </Text>{' '}
          unless proper documentation is provided and prior approval is
          obtained.
        </Text>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>Alcohol or tobacco products</Text> without
          the required permits and compliance with local laws.
        </Text>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>Items requiring special permits,</Text> such
          as cultural artifacts or wildlife products, unless approved in writing
          by Rapidmate.
        </Text>
      </View>

      <Text style={styles.subheading}>7.5 High-Value Items</Text>
      <Text style={styles.subheading}>Handling of High-Cost Items</Text>
      <Text style={styles.paragraph}>
        Definition and Scope of High-Cost Items
      </Text>
      <Text style={styles.paragraph}>
        For the purposes of this agreement, "High-Cost Items" are goods or
        products with significant monetary value, typically exceeding €2,500, or
        any item with intrinsic or sentimental value, such as:
      </Text>
      <Text style={styles.paragraph}>Jewelry and precious metals</Text>
      <Text style={styles.paragraph}>
        Cash or negotiable instruments (e.g., checks, bonds)
      </Text>
      <Text style={styles.paragraph}>
        Expensive electronics, designer items, or luxury goods
      </Text>
      <Text style={styles.paragraph}>Antiques, artworks, and collectibles</Text>

      <Text style={styles.subheading}>Declaration and Insurance</Text>
      <Text style={styles.paragraph}>
        Customers must declare any High-Cost Items during the booking process.
      </Text>
      <Text style={styles.paragraph}>
        Rapidmate strongly recommends that customers arrange adequate insurance
        for such items before delivery. Without insurance, the customer assumes
        full responsibility for any risk of damage, loss, or theft.
      </Text>

      <Text style={styles.subheading}>Liability and Compensation</Text>
      <Text style={styles.subheading}>Damage to High-Cost Items</Text>

      <Text style={styles.subheading}>
        If the cost of the damaged item is high:
      </Text>
      <Text style={styles.paragraph}>
        Rapidmate will not be held liable for damage or loss of high-cost items,
        regardless of the circumstances. Customers are advised to insure such
        items through their chosen provider to safeguard against potential
        risks.
      </Text>

      <Text style={styles.subheading}>
        If the cost of the damaged item is lower:
      </Text>
      <Text style={styles.paragraph}>
        Liability depends on the nature of the incident:
      </Text>

      <Text style={styles.subheading}>
        Damage caused by the Rapidmate delivery personnel:
      </Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>
            If damage occurs due to negligence or mishandling by Rapidmate’s
            delivery personnel,
          </Text>{' '}
          compensation will be handled through the delivery personnel's
          commercial insurance.
        </Text>
      </View>

      <Text style={styles.subheading}>
        Damage caused by external accidents (e.g., other vehicles):
      </Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>
            If damage results from a third-party accident,
          </Text>{' '}
          Rapidmate will assist in facilitating a claim process where
          applicable, but the customer acknowledges that Rapidmate holds no
          liability for such incidents.
        </Text>
      </View>

      <Text style={styles.subheading}>Zero Impact Policy for Rapidmate</Text>
      <Text style={styles.paragraph}>
        Rapidmate strives to maintain a zero-liability stance for high-cost
        items. This ensures that the company is not financially or legally
        impacted by claims related to such items. To ensure this:
      </Text>
      <Text style={styles.paragraph}>
        Customers are required to secure insurance for high-cost items.
      </Text>
      <Text style={styles.paragraph}>
        Rapidmate will not be responsible for losses, damages, or theft
        involving high-cost items, irrespective of the cause.
      </Text>

      <Text style={styles.subheading}>Customer Acknowledgment</Text>
      <Text style={styles.paragraph}>
        By booking with Rapidmate, the customer agrees to:
      </Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          Declare high-cost items at the time of booking.
        </Text>
        <Text style={styles.listItem}>
          Assume full responsibility for arranging insurance for any high-cost
          items.
        </Text>
        <Text style={styles.listItem}>
          Indemnify Rapidmate against any claims, losses, or damages resulting
          from the transportation of high-cost items.
        </Text>
      </View>

      <Text style={styles.subheading}>7.6 Other Prohibited Items</Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>Live animals or plants</Text> unless
          explicitly agreed upon with appropriate packaging and handling
          arrangements.
        </Text>
        <Text style={styles.listItem}>
          Human remains, body parts, or biological specimens.
        </Text>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>Items emitting strong odors</Text> or
          substances that may damage other goods or equipment.
        </Text>
      </View>

      <Text style={styles.subheading}>Consequences of Non-Compliance</Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>Refusal of Service:</Text> Rapidmate
          reserves the right to refuse pickup or delivery of any shipment
          suspected of containing prohibited items.
        </Text>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>Liability:</Text> If prohibited items are
          shipped without disclosure, the client assumes all liability,
          including fines, penalties, or damages incurred.
        </Text>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>Reporting:</Text> Rapidmate may report the
          shipment of illegal items to relevant authorities as required by law.
        </Text>

        <Text style={styles.subheading}>8. Dispute Resolution</Text>

        <Text style={styles.subheading}>8.1 Complaint Submission</Text>
        <Text style={styles.paragraph}>
          Complaints must be sent to the Rapidmate customer support via email or
          by courier within 7 days of the incident.
        </Text>

        <Text style={styles.subheading}>8.2 Resolution Process</Text>
        <Text style={styles.paragraph}>
          Rapidmate will acknowledge complaints within 48 hours and provide a
          resolution within 14 days.
        </Text>

        <Text style={styles.subheading}>8.3 Escalation</Text>
        <Text style={styles.paragraph}>
          Unresolved disputes may be referred to mediation or arbitration under
          French law.
        </Text>

        <Text style={styles.subheading}>9. Compliance and Sustainability</Text>

        <Text style={styles.subheading}>9.1 Sustainability Commitment</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>
            <Text style={styles.bold}>
              Rapidmate is committed to promoting eco-friendly practices
            </Text>{' '}
            and fostering sustainability in delivery operations. To encourage
            the adoption of environmentally conscious behaviors, we provide
            resources and education to both Users and Couriers on sustainable
            practices.
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.bold}>
              While Rapidmate does not currently offer financial incentives
            </Text>{' '}
            for couriers using electric vehicles, we are exploring opportunities
            to support sustainable delivery methods in the future.
          </Text>
        </View>

        <Text style={styles.subheading}>9.2 Legal Compliance</Text>
        <Text style={styles.paragraph}>
          Users and Couriers must adhere to all applicable French laws regarding
          delivery, transportation, and data privacy.
        </Text>

        <Text style={styles.subheading}>10. Amendments and Governing Law</Text>

        <Text style={styles.subheading}>10.1 Amendments</Text>
        <Text style={styles.paragraph}>
          Rapidmate reserves the right to update these Terms & Conditions with
          prior notice to Users and Couriers.
        </Text>

        <Text style={styles.subheading}>10.2 Governing Law</Text>
        <Text style={styles.paragraph}>
          These Terms & Conditions are governed by French law.
        </Text>

        <Text style={styles.subheading}>11. Account Deletion</Text>
        <Text style={styles.paragraph}>
          You may request the deletion of your account at any time by contacting
          us through contact@rapidmate.fr or using the support feature available
          on the platform. Upon receiving your request, we will process the
          deletion of your account in accordance with our policies.
        </Text>
        <Text style={styles.paragraph}>
          Once your account is deleted, you will no longer have access to any of
          the services associated with your account. Please be aware that
          account deletion is permanent and irreversible. After deletion, you
          will lose access to any data, records, or content associated with your
          account, except where we are required by law to retain certain
          information.
        </Text>
        <Text style={styles.paragraph}>
          We may retain certain information for legitimate business or legal
          reasons, such as transaction history or records required for
          compliance with applicable laws and regulations.
        </Text>
        <Text style={styles.paragraph}>
          If you have any questions about the account deletion process, please
          contact us at{' '}
          <Text onPress={() => Linking.openURL('mailto:contact@rapidmate.fr')}>
            contact@rapidmate.fr
          </Text>
        </Text>

        <Text style={styles.subheading}>Contact Information</Text>

        <Text style={styles.contact}>
          Email:{' '}
          <Text
            style={styles.highlight}
            onPress={() => Linking.openURL('mailto:contact@rapidmate.fr')}>
            contact@rapidmate.fr
          </Text>
        </Text>

        <Text style={[styles.contact, {marginBottom: 30}]}>
          Phone:{' '}
          <Text
            style={styles.highlight}
            onPress={() => Linking.openURL('tel:+33752371022')}>
            [+33752371022]
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: colors.text,
  },
  highlight: {
    color: colors.secondary,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 8,
    color: colors.text,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    color: colors.text,
  },
  subheading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    color: colors.text,
  },
  paragraph: {
    fontSize: 16,
    marginTop: 8,
    marginBottom: 8,
    color: colors.text,
  },
  bold: {
    fontWeight: 'bold',
    color: colors.text,
  },
  list: {
    marginTop: 8,
    color: colors.text,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 8,
    color: colors.text,
  },
  contact: {
    fontSize: 16,
    marginTop: 8,
    marginBottom: 8,
    color: colors.text,
  },
});

export default TermsAndConditions;
