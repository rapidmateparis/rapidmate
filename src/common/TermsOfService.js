import React from 'react';
import {ScrollView, Text, View, StyleSheet, Linking} from 'react-native';
import {colors} from '../colors';
import {localizationText} from '../utils/common';

const TermsAndConditions = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {localizationText('TermsConditions', 'TermsConditionsFor')}{' '}
        <Text style={styles.highlight}>Rapidmate</Text>
      </Text>
      <Text style={styles.subtitle}>
        {localizationText('TermsConditions', 'effectiveDate')}:{' '}
        <Text style={styles.highlight}>02/01/2025</Text>
      </Text>
      <Text style={styles.subtitle}>
        {localizationText('TermsConditions', 'lastUpdated')}:{' '}
        <Text style={styles.highlight}>02/01/2025</Text>
      </Text>

      <Text style={styles.heading}>
        1. {localizationText('TermsConditions', 'generalProvisions')}
      </Text>

      <Text style={styles.subheading}>
        1.1 {localizationText('TermsConditions', 'introduction')}:
      </Text>
      <Text style={styles.bold}>
        {localizationText('TermsConditions', 'rapidmateIntroDesc')}
      </Text>

      <Text style={styles.subheading}>
        1.2 {localizationText('TermsConditions', 'definitions')}
      </Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>
            “{localizationText('TermsConditions', 'user')}”:
          </Text>{' '}
          {localizationText('TermsConditions', 'userDescription')}
        </Text>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>
            “{localizationText('TermsConditions', 'courier')}”:
          </Text>{' '}
          {localizationText('TermsConditions', 'courierDescription')}
        </Text>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>
            “{localizationText('TermsConditions', 'platform')}”:
          </Text>{' '}
          {localizationText('TermsConditions', 'platformDescription')}
        </Text>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>
            “{localizationText('TermsConditions', 'service')}”:
          </Text>{' '}
          {localizationText('TermsConditions', 'serviceDescription')}
        </Text>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>
            “{localizationText('TermsConditions', 'goods')}”:
          </Text>{' '}
          {localizationText('TermsConditions', 'goodsDescription')}
        </Text>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>
            “{localizationText('TermsConditions', 'fee')}”:
          </Text>{' '}
          {localizationText('TermsConditions', 'feeDescription')}
        </Text>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>
            “{localizationText('TermsConditions', 'forceMajeure')}”:
          </Text>{' '}
          {localizationText('TermsConditions', 'forceMajeureDescription')}
        </Text>
      </View>

      <Text style={styles.subheading}>
        1.3 {localizationText('TermsConditions', 'acceptanceOfTerms')}
      </Text>
      <Text style={styles.paragraph}>
        {localizationText('TermsConditions', 'acceptanceOfTermsDescription')}
      </Text>

      <Text style={styles.subheading}>
        1.4 {localizationText('TermsConditions', 'geographicalScope')}
      </Text>
      <Text style={styles.paragraph}>
        {localizationText('TermsConditions', 'geographicalScopeDescription')}
      </Text>

      <Text style={styles.heading}>
        2. {localizationText('TermsConditions', 'servicesProvided')}
      </Text>
      <Text style={styles.subheading}>
        2.1 {localizationText('TermsConditions', 'forUsers')}
      </Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>
            {localizationText('TermsConditions', 'deliveryTypes')}:
          </Text>{' '}
          {localizationText('TermsConditions', 'deliveryTypesDescription')}
        </Text>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>
            {localizationText('TermsConditions', 'booking')}:
          </Text>{' '}
          {localizationText('TermsConditions', 'bookingDescription')}
        </Text>
      </View>

      <Text style={styles.subheading}>
        2.2 {localizationText('TermsConditions', 'forCouriers')}
      </Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>
            {localizationText('TermsConditions', 'opportunities')}:
          </Text>{' '}
          {localizationText('TermsConditions', 'opportunitiesDescription')}
        </Text>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>
            {localizationText('TermsConditions', 'payment')}:
          </Text>{' '}
          {localizationText('TermsConditions', 'paymentDescription')}
        </Text>
      </View>

      <Text style={styles.subheading}>
        2.3 {localizationText('TermsConditions', 'platformFacilitation')}
      </Text>
      <Text style={styles.paragraph}>
        {localizationText('TermsConditions', 'platformFacilitationDescription')}
      </Text>

      <Text style={styles.heading}>
        3. {localizationText('TermsConditions', 'userObligations')}
      </Text>
      <Text style={styles.subheading}>
        3.1 {localizationText('TermsConditions', 'accurateInformation')}
      </Text>
      <Text style={styles.paragraph}>
        {localizationText('TermsConditions', 'accurateInformationDescription')}
      </Text>

      <Text style={styles.subheading}>
        3.2 {localizationText('TermsConditions', 'packagingRequirements')}
      </Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          {localizationText('TermsConditions', 'securelyPackaged')}
        </Text>
        <Text style={styles.listItem}>
          {localizationText('TermsConditions', 'securelyProhibited')}
        </Text>
      </View>

      <Text style={styles.subheading}>
        3.3 {localizationText('TermsConditions', 'serviceFees')}
      </Text>
      <Text style={styles.paragraph}>
        {localizationText('TermsConditions', 'applicableFees')}
      </Text>

      <Text style={styles.subheading}>
        3.4 {localizationText('TermsConditions', 'complianceWithLaws')}
      </Text>
      <Text style={styles.paragraph}>
        {localizationText('TermsConditions', 'complianceWithLawsDescription')}
      </Text>

      <Text style={styles.heading}>
        4. {localizationText('TermsConditions', 'courierObligations')}
      </Text>
      <Text style={styles.subheading}>
        4.1 {localizationText('TermsConditions', 'eligibility')}
      </Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          {localizationText('TermsConditions', 'validIdentification')}
        </Text>
        <Text style={styles.listItem}>
          {localizationText('TermsConditions', 'couriersUsingVehicles')}
        </Text>
      </View>

      <Text style={styles.subheading}>
        4.2 {localizationText('TermsConditions', 'deliveryConduct')}
      </Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          {localizationText('TermsConditions', 'couriersProfessionally')}
        </Text>
        <Text style={styles.listItem}>
          {localizationText('TermsConditions', 'misconductIncluding')}
        </Text>
      </View>

      <Text style={styles.subheading}>
        4.3 {localizationText('TermsConditions', 'equipment')}
      </Text>
      <Text style={styles.paragraph}>
        {localizationText('TermsConditions', 'equipmentDescription')}
      </Text>

      <Text style={styles.subheading}>
        4.4 {localizationText('TermsConditions', 'performanceStandards')}
      </Text>
      <Text style={styles.paragraph}>
        {localizationText('TermsConditions', 'performanceStandardsDescription')}
      </Text>

      <Text style={styles.heading}>
        5. {localizationText('TermsConditions', 'pricingPaymentsCancellations')}
      </Text>
      <Text style={styles.subheading}>
        5.1 {localizationText('TermsConditions', 'pricing')}
      </Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          {localizationText('TermsConditions', 'serviceFeesCalculated')}
        </Text>
        <Text style={styles.listItem}>
          {localizationText('TermsConditions', 'serviceFeesConfirmation')}
        </Text>
      </View>

      <Text style={styles.subheading}>
        5.2 {localizationText('TermsConditions', 'payments')}
      </Text>
      <Text style={styles.paragraph}>
        {localizationText('TermsConditions', 'paymentsServicesRendered')}
      </Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>
            {localizationText('TermsConditions', 'shiftBasedPayments')}:
          </Text>{' '}
          {localizationText('TermsConditions', 'shiftBasedPaymentsDescription')}
        </Text>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>
            {localizationText('TermsConditions', 'adminApprovedExceptions')}:
          </Text>{' '}
          {localizationText(
            'TermsConditions',
            'adminApprovedExceptionsDescription',
          )}
        </Text>
        <Text style={styles.listItem}>
          {localizationText('TermsConditions', 'couriersAreProhibited')}
        </Text>
      </View>
      <Text style={styles.paragraph}>
        {localizationText('TermsConditions', 'maintainsAllRecords')}
      </Text>

      <Text style={styles.subheading}>
        5.3 {localizationText('TermsConditions', 'cancellations')}
      </Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          {localizationText('TermsConditions', 'courierIsDispatched')}
        </Text>
        <Text style={styles.listItem}>
          {localizationText('TermsConditions', 'cancellationsCourier')}
        </Text>
      </View>

      <Text style={styles.subheading}>
        6. {localizationText('TermsConditions', 'liability')}
      </Text>
      <Text style={styles.subheading}>
        6.1 {localizationText('TermsConditions', 'userLiability')}
      </Text>
      <Text style={styles.paragraph}>
        {localizationText('TermsConditions', 'userLiabilityDescription')}
      </Text>
      <Text style={styles.subheading}>
        6.2 {localizationText('TermsConditions', 'courierLiability')}
      </Text>
      <Text style={styles.paragraph}>
        {localizationText('TermsConditions', 'courierLiabilityDescription')}
      </Text>
      <Text style={styles.subheading}>
        6.3 {localizationText('TermsConditions', 'rapidmateLiability')}
      </Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>
            {localizationText('TermsConditions', 'rapidmateMisinformation')}
          </Text>
        </Text>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>
            {localizationText('TermsConditions', 'submittedWithin')}
          </Text>
        </Text>
      </View>

      <Text style={styles.subheading}>
        7. {localizationText('TermsConditions', 'prohibitedItems')}
      </Text>
      <Text style={styles.paragraph}>
        {localizationText('TermsConditions', 'prohibitedItemsDescription')}
      </Text>

      <Text style={styles.subheading}>
        7.1 {localizationText('TermsConditions', 'hazardousMaterials')}
      </Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          {localizationText('TermsConditions', 'flammableExplosive')}
        </Text>
        <Text style={styles.listItem}>
          {localizationText('TermsConditions', 'corrosiveRadioactive')}
        </Text>
        <Text style={styles.listItem}>
          {localizationText('TermsConditions', 'ammunitionClassified')}
        </Text>
      </View>

      <Text style={styles.subheading}>
        7.2 {localizationText('TermsConditions', 'illegalItems')}
      </Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          {localizationText('TermsConditions', 'illegalItemsDescription')}
        </Text>
        <Text style={styles.listItem}>
          {localizationText('TermsConditions', 'violatingIntellectual')}
        </Text>
      </View>

      <Text style={styles.subheading}>
        7.3 {localizationText('TermsConditions', 'perishableGoods')}
      </Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          {localizationText('TermsConditions', 'perishableTemperature')}
        </Text>
        <Text style={styles.listItem}>
          {localizationText('TermsConditions', 'perishableTransit')}
        </Text>
      </View>

      <Text style={styles.subheading}>
        7.4 {localizationText('TermsConditions', 'restrictedRegulatedItems')}
      </Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          {localizationText('TermsConditions', 'medicinesPharmaceutical')}
        </Text>
        <Text style={styles.listItem}>
          {localizationText('TermsConditions', 'alcoholCompliance')}
        </Text>
        <Text style={styles.listItem}>
          {localizationText('TermsConditions', 'requiringArtifacts')}
        </Text>
      </View>

      <Text style={styles.subheading}>
        7.5 {localizationText('TermsConditions', 'highValueItems')}
      </Text>
      <Text style={styles.subheading}>
        {localizationText('TermsConditions', 'handlingHighCostItems')}
      </Text>
      <Text style={styles.paragraph}>
        {localizationText('TermsConditions', 'definitionScopeItems')}
      </Text>
      <Text style={styles.paragraph}>
        {localizationText('TermsConditions', 'definitionScopeItemsDescription')}
      </Text>
      <Text style={styles.paragraph}>
        {localizationText('TermsConditions', 'jewelryPreciousMetals')}
      </Text>
      <Text style={styles.paragraph}>
        {localizationText('TermsConditions', 'negotiableInstruments')}
      </Text>
      <Text style={styles.paragraph}>
        {localizationText('TermsConditions', 'expensiveElectronics')}
      </Text>
      <Text style={styles.paragraph}>
        {localizationText('TermsConditions', 'antiquesCollectibles')}
      </Text>
      <Text style={styles.paragraph}>
        {localizationText('TermsConditions', 'responsibilityRiskManagement')}
      </Text>

      <Text style={styles.subheading}>
        {localizationText('TermsConditions', 'declarationInsurance')}
      </Text>
      <Text style={styles.paragraph}>
        {localizationText('TermsConditions', 'customersBookingProcess')}
      </Text>
      <Text style={styles.paragraph}>
        {localizationText('TermsConditions', 'stronglyRecommends')}
      </Text>

      <Text style={styles.subheading}>
        {localizationText('TermsConditions', 'liabilityCompensation')}
      </Text>
      <Text style={styles.subheading}>
        {localizationText('TermsConditions', 'damageHighCostItems')}
      </Text>

      <Text style={styles.subheading}>
        {localizationText('TermsConditions', 'damageHighCostItemsDescription')}
      </Text>
      <Text style={styles.paragraph}>
        {localizationText('TermsConditions', 'highCostItemsDescription')}
      </Text>

      <Text style={styles.subheading}>
        {localizationText('TermsConditions', 'lowerCostItems')}
      </Text>
      <Text style={styles.paragraph}>
        {localizationText('TermsConditions', 'lowerCostItemsDescription')}
      </Text>

      <Text style={styles.subheading}>
        {localizationText('TermsConditions', 'deliveryPersonnel')}
      </Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          {localizationText('TermsConditions', 'mishandlingPersonnel')}
        </Text>
      </View>

      <Text style={styles.subheading}>
        {localizationText('TermsConditions', 'externalAccidents')}
      </Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          {localizationText('TermsConditions', 'externalAccidentsDescription')}
        </Text>
      </View>

      <Text style={styles.subheading}>
        {localizationText('TermsConditions', 'zeroImpactPolicy')}
      </Text>
      <Text style={styles.paragraph}>
        {localizationText('TermsConditions', 'rapidmateStrivesMaintain')}
      </Text>
      <Text style={styles.paragraph}>
        {localizationText('TermsConditions', 'secureInsurance')}
      </Text>
      <Text style={styles.paragraph}>
        {localizationText('TermsConditions', 'rapidmateResponsible')}
      </Text>

      <Text style={styles.subheading}>
        {localizationText('TermsConditions', 'customerAcknowledgment')}
      </Text>
      <Text style={styles.paragraph}>
        {localizationText('TermsConditions', 'bookingWithRapidmate')}
      </Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          {localizationText('TermsConditions', 'declareHighCostItems')}
        </Text>
        <Text style={styles.listItem}>
          {localizationText('TermsConditions', 'assumeFullResponsibility')}
        </Text>
        <Text style={styles.listItem}>
          {localizationText('TermsConditions', 'indemnifyRapidmateAgainst')}
        </Text>
      </View>

      <Text style={styles.subheading}>
        7.6 {localizationText('TermsConditions', 'otherProhibitedItems')}
      </Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          {localizationText('TermsConditions', 'liveAnimalsPlants')}
        </Text>
        <Text style={styles.listItem}>
          {localizationText('TermsConditions', 'biologicalSpecimens')}
        </Text>
        <Text style={styles.listItem}>
          {localizationText('TermsConditions', 'emittingStrongOdors')}
        </Text>
      </View>

      <Text style={styles.subheading}>
        {localizationText('TermsConditions', 'ConsequencesNonCompliance')}
      </Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>
            {localizationText('TermsConditions', 'refusalService')}:
          </Text>{' '}
          {localizationText('TermsConditions', 'refusalServiceDescription')}
        </Text>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>
            {localizationText('TermsConditions', 'liability')}:
          </Text>{' '}
          {localizationText('TermsConditions', 'prohibitedItemsShipped')}
        </Text>
        <Text style={styles.listItem}>
          <Text style={styles.bold}>
            {localizationText('TermsConditions', 'reporting')}:
          </Text>{' '}
          {localizationText('TermsConditions', 'rapidmateMayReport')}
        </Text>

        <Text style={styles.subheading}>
          8. {localizationText('TermsConditions', 'disputeResolution')}
        </Text>

        <Text style={styles.subheading}>
          8.1 {localizationText('TermsConditions', 'complaintSubmission')}
        </Text>
        <Text style={styles.paragraph}>
          {localizationText(
            'TermsConditions',
            'complaintSubmissionDescription',
          )}
        </Text>

        <Text style={styles.subheading}>
          8.2 {localizationText('TermsConditions', 'resolutionProcess')}
        </Text>
        <Text style={styles.paragraph}>
          {localizationText('TermsConditions', 'resolutionProcessDescription')}
        </Text>

        <Text style={styles.subheading}>
          8.3 {localizationText('TermsConditions', 'escalation')}
        </Text>
        <Text style={styles.paragraph}>
          {localizationText('TermsConditions', 'escalationDescription')}
        </Text>

        <Text style={styles.subheading}>
          9. {localizationText('TermsConditions', 'complianceSustainability')}
        </Text>

        <Text style={styles.subheading}>
          9.1 {localizationText('TermsConditions', 'sustainabilityCommitment')}
        </Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>
            {localizationText('TermsConditions', 'rapidmateCommittedPromoting')}
          </Text>
          <Text style={styles.listItem}>
            {localizationText(
              'TermsConditions',
              'rapidmateDoesNotCurrentlyOffer',
            )}
          </Text>
        </View>

        <Text style={styles.subheading}>
          9.2 {localizationText('TermsConditions', 'legalCompliance')}
        </Text>
        <Text style={styles.paragraph}>
          {localizationText('TermsConditions', 'usersAndCouriers')}
        </Text>

        <Text style={styles.subheading}>
          10. {localizationText('TermsConditions', 'amendmentsAndGoverningLaw')}
        </Text>

        <Text style={styles.subheading}>
          10.1 {localizationText('TermsConditions', 'amendments')}
        </Text>
        <Text style={styles.paragraph}>
          {localizationText('TermsConditions', 'rapidmateReserves')}
        </Text>

        <Text style={styles.subheading}>
          10.2 {localizationText('TermsConditions', 'governingLaw')}
        </Text>
        <Text style={styles.paragraph}>
          {localizationText('TermsConditions', 'governingLawDescription')}
        </Text>

        <Text style={styles.subheading}>
          11. {localizationText('TermsConditions', 'accountDeletion')}
        </Text>
        <Text style={styles.paragraph}>
          {localizationText('TermsConditions', 'accountDeletionDescription')}
        </Text>
        <Text style={styles.paragraph}>
          {localizationText('TermsConditions', 'onceYourAccountDeleted')}
        </Text>
        <Text style={styles.paragraph}>
          {localizationText('TermsConditions', 'retainCertainInformation')}
        </Text>
        <Text style={styles.paragraph}>
          {localizationText('TermsConditions', 'questionsAboutAccountDeletion')}
        </Text>

        <Text style={styles.subheading}>
          {localizationText('TermsConditions', 'contactInformation')}
        </Text>

        <Text style={styles.contact}>
          Email:{' '}
          <Text
            style={styles.highlight}
            onPress={() => Linking.openURL('mailto:contact@rapidmate.fr')}>
            contact@rapidmate.fr
          </Text>
        </Text>

        <Text style={[styles.contact, {marginBottom: 30}]}>
          {localizationText('TermsConditions', 'phone')}:{' '}
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
