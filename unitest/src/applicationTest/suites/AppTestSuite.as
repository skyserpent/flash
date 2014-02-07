package applicationTest.suites {
    import applicationTest.TestCipherKey;
    import applicationTest.TestGrant;
    import applicationTest.TestHeartbeat;
    import applicationTest.TestHereNow;
    import applicationTest.TestHistory;
    import applicationTest.TestPublish;
    import applicationTest.TestRawEncryption;
    import applicationTest.TestState;
    import applicationTest.TestSubscribe;
    import applicationTest.TestTime;
    import applicationTest.TestUUID;
    import applicationTest.TestWhereNow;

    [Suite]
    [RunWith("org.flexunit.runners.Suite")]

    public class AppTestSuite {
        public var publishTest:TestPublish;
        public var subscribeTest:TestSubscribe;
        public var timeTest:TestTime;
        public var uuidTest:TestUUID;
        public var hereNowTest:TestHereNow;
        public var historyTest:TestHistory;
        public var grantTest:TestGrant;
        public var whereNowTest:TestWhereNow;
        public var stateTest:TestState;
        public var cipherKeyTest:TestCipherKey;
        public var rawEncryptionTest:TestRawEncryption;
        public var heartbeatTest:TestHeartbeat;
    }
}