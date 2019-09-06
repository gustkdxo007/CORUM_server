// USER

module.exports = (sequelize, DataType) => {
  return sequelize.define("user", {
    // 이메일 아이디
    userId: {
      type: DataType.STRING(40),
      allowNull: false,
      primaryKey: true
    },
    // 이름
    name: {
      type: DataType.STRING(10),
      allowNull: false
    },
    // 닉네임
    nickname: {
      type: DataType.STRING(10),
      allowNull: false
    },
    // 성별
    gender: {
      type: DataType.STRING(10),
      allowNull: false
    },
    // 깃허브 주소
    github_addr: {
      type: DataType.STRING(40),
      allowNull: false
    },
    // 구글 주소
    contact_email: {
      type: DataType.STRING(40),
      allowNull: false
    },
    // 기수
    gitsu: {
      type: DataType.INTEGER,
      allowNull: true
    },
    // 이미지
    userImage: {
      type: DataType.BLOB(),
      allowNull: true
    },
    // 기술정보
    tech: {
      type: DataType.STRING(200),
      allowNull: false
    },
    // 나의 회사
    company: {
      type: DataType.STRING(20),
      allowNull: false
    },
    // 자소서
    intro: {
      type: DataType.TEXT,
      allowNull: false
    },
    // 카톡, git, google, local 로그인할때마다 무슨 소셜을 쓸껀지 가르켜주기 위함
    provider: {
      type: DataType.STRING(20),
      allowNull: false,
      defaultValue: "local"
    }
  });
};
