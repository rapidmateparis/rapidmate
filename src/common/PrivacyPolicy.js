import React from 'react';
import {View, Text, ScrollView, StyleSheet, Linking} from 'react-native';
import {colors} from '../colors';
import {localizationText} from '../utils/common';

const PrivacyPolicy = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <View style={styles.card}>
          <Text style={styles.title}>
            {localizationText('PrivacyPolicy', 'privacyPolicy')}
          </Text>
          <Text style={styles.date}>
            {localizationText('PrivacyPolicy', 'lastUpdated')}:{' '}
            <Text style={styles.highlight}>
              {localizationText('PrivacyPolicy', 'januaryPrivacyText')}
            </Text>
          </Text>
          <Text style={styles.paragraph}>
            {localizationText('PrivacyPolicy', 'rapidmateCommitted')}
          </Text>
          <Text style={styles.paragraph}>
            {localizationText('PrivacyPolicy', 'pleaseReviewPolicy')}
          </Text>

          <Text style={styles.sectionTitle}>
            1. {localizationText('PrivacyPolicy', 'whoWeAre')}
          </Text>
          <Text style={styles.paragraph}>
            {localizationText('PrivacyPolicy', 'rapidmateProvides')}
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
            {localizationText('PrivacyPolicy', 'postalAddress')}:{' '}
            <Text style={styles.highlight}>
              8 B Av. Danielle Casanova ,95210 Saint -Gratien
            </Text>
          </Text>

          <Text style={styles.sectionTitle}>
            2. {localizationText('PrivacyPolicy', 'dataWeCollect')}
          </Text>
          <Text style={styles.subSectionTitle}>
            2.1. {localizationText('PrivacyPolicy', 'fromWebsiteVisitors')}
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>
              {localizationText('PrivacyPolicy', 'dataCollected')}:
            </Text>
            {localizationText('PrivacyPolicy', 'dataCollectedDescription')}
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>
              {localizationText('PrivacyPolicy', 'purpose')}:
            </Text>{' '}
            {localizationText('PrivacyPolicy', 'purposeDescription')}
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>
              {localizationText('PrivacyPolicy', 'lawfulBasis')}:
            </Text>{' '}
            {localizationText('PrivacyPolicy', 'lawfulBasisDescription')}
          </Text>

          <Text style={styles.subSectionTitle}>
            2.2. {localizationText('PrivacyPolicy', 'fromRegisteredUsers')}
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>
              {localizationText('PrivacyPolicy', 'dataCollected')}:
            </Text>
          </Text>
          <Text style={styles.paragraph}>
            {localizationText('PrivacyPolicy', 'personalIdentifiers')}
          </Text>
          <Text style={styles.paragraph}>
            {localizationText('PrivacyPolicy', 'paymentDetails')}
          </Text>
          <Text style={styles.paragraph}>
            {localizationText('PrivacyPolicy', 'deliveryInformation')}
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>
              {localizationText('PrivacyPolicy', 'purpose')}:{' '}
            </Text>
            {localizationText('PrivacyPolicy', 'serviceDelivery')}
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>
              {localizationText('PrivacyPolicy', 'lawfulBasis')}:{' '}
            </Text>
            {localizationText('PrivacyPolicy', 'contractualNecessity')}
          </Text>
          <Text style={styles.sectionTitle}>
            2.3. {localizationText('PrivacyPolicy', 'fromCouriers')}:
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>
              {localizationText('PrivacyPolicy', 'dataCollected')}:
            </Text>
          </Text>
          <Text style={styles.paragraph}>
            {localizationText('PrivacyPolicy', 'personalIdentifiersCouriers')}
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>
              {localizationText('PrivacyPolicy', 'sIRETNumber')}{' '}
            </Text>{' '}
            {localizationText('PrivacyPolicy', 'individualEntrepreneurs')}
          </Text>
          <Text style={styles.paragraph}>
            {localizationText('PrivacyPolicy', 'financialDetails')}
          </Text>
          <Text style={styles.paragraph}>
            {localizationText('PrivacyPolicy', 'geolocationData')}
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>
              {localizationText('PrivacyPolicy', 'purpose')}:{' '}
            </Text>
            {localizationText('PrivacyPolicy', 'identityVerification')}
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>
              {localizationText('PrivacyPolicy', 'lawfulBasis')}:{' '}
            </Text>
            {localizationText('PrivacyPolicy', 'contractualNecessitylegal')}
          </Text>
          <Text style={styles.sectionTitle}>
            2.4.{' '}
            {localizationText('PrivacyPolicy', 'cookiesTrackingTechnologies')}
          </Text>
          <Text style={styles.paragraph}>
            {localizationText(
              'PrivacyPolicy',
              'cookiesTrackingTechnologiesDes',
            )}
          </Text>
          <Text style={styles.paragraph}>
            {localizationText('PrivacyPolicy', 'cookiesForMoreDetails')}
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>
              {localizationText('PrivacyPolicy', 'lawfulBasis')}:{' '}
            </Text>
            {localizationText('PrivacyPolicy', 'consentCookies')}
          </Text>
          <Text style={styles.paragraph}>
            {localizationText('PrivacyPolicy', 'consentCookiesDescription')}
          </Text>
          <Text style={styles.paragraph}>
            {localizationText('PrivacyPolicy', 'consentCookiescontinuing')}
          </Text>
          <Text style={styles.paragraph}>
            {localizationText('PrivacyPolicy', 'enhanceUserExperience')}
          </Text>
          <Text>{localizationText('PrivacyPolicy', 'manageYourCookie')}</Text>
          <Text style={styles.sectionTitle}>
            3. {localizationText('PrivacyPolicy', 'howWeUseYourData')}
          </Text>
          <Text style={styles.paragraph}>
            {localizationText('PrivacyPolicy', 'yourPersonalData')}
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>
              1. {localizationText('PrivacyPolicy', 'serviceProvision')}:
            </Text>{' '}
            {localizationText('PrivacyPolicy', 'serviceProvisionProcessOrders')}
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>
              2. {localizationText('PrivacyPolicy', 'customerSupport')}:
            </Text>{' '}
            {localizationText('PrivacyPolicy', 'customerSupportDes')}
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>
              3. {localizationText('PrivacyPolicy', 'marketing')}:
            </Text>{' '}
            {localizationText('PrivacyPolicy', 'promotionalMaterials')}
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>
              4. {localizationText('PrivacyPolicy', 'analytics')}:
            </Text>{' '}
            {localizationText('PrivacyPolicy', 'analyticsDescription')}
          </Text>
          <Text style={styles.sectionTitle}>
            4. {localizationText('PrivacyPolicy', 'dataSharing')}
          </Text>
          <Text style={styles.paragraph}>
            {localizationText('PrivacyPolicy', 'weMayShare')}:
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.bold}>
              {localizationText('PrivacyPolicy', 'serviceProviders')}:
            </Text>{' '}
            {localizationText('PrivacyPolicy', 'serviceProvidersDesc')}
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.bold}>
              {localizationText('PrivacyPolicy', 'couriers')}:
            </Text>{' '}
            {localizationText('PrivacyPolicy', 'couriersDescription')}
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.bold}>
              {localizationText('PrivacyPolicy', 'legalAuthorities')}:
            </Text>{' '}
            {localizationText('PrivacyPolicy', 'legalAuthoritiesDescription')}
          </Text>
          <Text style={styles.paragraph}>
            {localizationText('PrivacyPolicy', 'rapidmateNoDataSell')}
          </Text>

          <Text style={styles.sectionTitle}>
            5. {localizationText('PrivacyPolicy', 'internationalDataTransfers')}
          </Text>
          <Text style={styles.paragraph}>
            {localizationText('PrivacyPolicy', 'internationalDataTransfersDes')}
          </Text>

          <Text style={styles.sectionTitle}>
            6. {localizationText('PrivacyPolicy', 'dataRetention')}
          </Text>
          <Text style={styles.paragraph}>
            {localizationText('PrivacyPolicy', 'dataRetentionDescription')}
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.bold}>
              {localizationText('PrivacyPolicy', 'customerData')}:
            </Text>{' '}
            {localizationText('PrivacyPolicy', 'customerDataDescription')}
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.bold}>
              {localizationText('PrivacyPolicy', 'courierData')}:
            </Text>{' '}
            {localizationText('PrivacyPolicy', 'courierDataDescription')}
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.bold}>
              {localizationText('PrivacyPolicy', 'paymentRecords')}:
            </Text>{' '}
            {localizationText('PrivacyPolicy', 'paymentRecordsDescription')}
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.bold}>
              {localizationText('PrivacyPolicy', 'cookiesAndAnalytics')}:
            </Text>{' '}
            {localizationText(
              'PrivacyPolicy',
              'cookiesAndAnalyticsDescription',
            )}
          </Text>

          <Text style={styles.sectionTitle}>
            7. {localizationText('PrivacyPolicy', 'securityMeasures')}
          </Text>
          <Text style={styles.paragraph}>
            {localizationText('PrivacyPolicy', 'securityMeasuresDescription')}
          </Text>
          <Text style={styles.listItem}>
            {localizationText('PrivacyPolicy', 'encryptionSensitiveData')}
          </Text>
          <Text style={styles.listItem}>
            {localizationText('PrivacyPolicy', 'restrictedPersonalData')}
          </Text>
          <Text style={styles.listItem}>
            {localizationText('PrivacyPolicy', 'regularResponseProcedures')}
          </Text>

          <Text style={styles.sectionTitle}>
            8. {localizationText('PrivacyPolicy', 'yourRights')}
          </Text>
          <Text style={styles.paragraph}>
            {localizationText('PrivacyPolicy', 'underGDPR')}
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.bold}>
              {localizationText('PrivacyPolicy', 'access')}:
            </Text>{' '}
            {localizationText('PrivacyPolicy', 'accessDescription')}
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.bold}>
              {localizationText('PrivacyPolicy', 'rectification')}:
            </Text>{' '}
            {localizationText('PrivacyPolicy', 'rectificationDescription')}
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.bold}>
              {localizationText('PrivacyPolicy', 'erasure')}:
            </Text>{' '}
            {localizationText('PrivacyPolicy', 'erasureDescription')}
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.bold}>
              {localizationText('PrivacyPolicy', 'restriction')}:
            </Text>{' '}
            {localizationText('PrivacyPolicy', 'restrictionDescription')}
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.bold}>
              {localizationText('PrivacyPolicy', 'portability')}:
            </Text>{' '}
            {localizationText('PrivacyPolicy', 'portabilityDescription')}
          </Text>
          <Text style={styles.listItem}>
            <Text style={styles.bold}>
              {localizationText('PrivacyPolicy', 'objection')}:
            </Text>{' '}
            {localizationText('PrivacyPolicy', 'objectionDescription')}
          </Text>
          <Text style={styles.paragraph}>
            {localizationText('PrivacyPolicy', 'exerciseRightsContact')}{' '}
            contact@rapidmate.fr
          </Text>

          <Text style={styles.sectionTitle}>
            9.{localizationText('PrivacyPolicy', 'accountDeletion')}
          </Text>
          <Text>
            {localizationText('PrivacyPolicy', 'accountDeletionDescription')}
          </Text>
          <Text style={styles.paragraph}>
            {localizationText('PrivacyPolicy', 'accountDeletionAfter')}
          </Text>
          <Text style={styles.paragraph}>
            {localizationText('PrivacyPolicy', 'certainInformation')}
          </Text>
          <Text>
            {localizationText('PrivacyPolicy', 'questionsDeletionProcess')}
          </Text>
          <Text style={styles.sectionTitle}>
            10. {localizationText('PrivacyPolicy', 'complaints')}
          </Text>
          <Text style={styles.paragraph}>
            {localizationText('PrivacyPolicy', 'complaintsDescription')}
          </Text>
          <Text style={styles.paragraph}>
            {localizationText('PrivacyPolicy', 'satisfactionComplaint')}
          </Text>
          <Text style={styles.listItem}>
            {localizationText('PrivacyPolicy', 'commissionNationale')}
          </Text>

          <Text style={styles.sectionTitle}>
            11. {localizationText('PrivacyPolicy', 'automatedDecisionMaking')}
          </Text>
          <Text style={styles.paragraph}>
            {localizationText(
              'PrivacyPolicy',
              'automatedDecisionMakingDescription',
            )}
          </Text>

          <Text style={styles.sectionTitle}>
            12. {localizationText('PrivacyPolicy', 'childrenPrivacy')}
          </Text>
          <Text style={styles.paragraph}>
            {localizationText('PrivacyPolicy', 'childrenPrivacyDescription')}
          </Text>

          <Text style={styles.sectionTitle}>
            13. {localizationText('PrivacyPolicy', 'updatesThisPolicy')}
          </Text>
          <Text style={styles.paragraph}>
            {localizationText('PrivacyPolicy', 'updatesThisPolicyDescription')}
          </Text>
          <Text style={styles.date}>
            {localizationText('PrivacyPolicy', 'lastUpdated')}:{' '}
            <Text style={styles.highlight}>
              {localizationText('PrivacyPolicy', 'januaryPrivacyText')}
            </Text>
          </Text>

          <Text style={styles.sectionTitle}>
            {localizationText('PrivacyPolicy', 'contactInformation')}
          </Text>
          <Text style={styles.paragraph}>
            {localizationText('PrivacyPolicy', 'contactInformationDescription')}
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
            {localizationText('PrivacyPolicy', 'postalAddress')}:{' '}
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
