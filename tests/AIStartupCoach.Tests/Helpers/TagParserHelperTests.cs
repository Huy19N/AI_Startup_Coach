using AIStartupCoach.API.Helpers;

namespace AIStartupCoach.Tests.Helpers;

public class TagParserHelperTests
{
    [Fact]
    public void ExtractIdeaSummary_ShouldReturnSummary_WhenTagExists()
    {
        // Arrange
        var input = "Đây là phản hồi từ AI. <idea_summary>Ý tưởng nền tảng AI kết nối mentor và sinh viên.</idea_summary> Chúc bạn thành công!";

        // Act
        var summary = TagParserHelper.ExtractIdeaSummary(input);

        // Assert
        Assert.Equal("Ý tưởng nền tảng AI kết nối mentor và sinh viên.", summary);
    }

    [Fact]
    public void ExtractIdeaSummary_ShouldReturnNull_WhenTagDoesNotExist()
    {
        // Arrange
        var input = "Đây là phản hồi từ AI không có thẻ summary.";

        // Act
        var summary = TagParserHelper.ExtractIdeaSummary(input);

        // Assert
        Assert.Null(summary);
    }

    [Fact]
    public void ExtractDocuments_ShouldReturnDocuments_WhenTagsExist()
    {
        // Arrange
        var input = "Nội dung trước.\n<document type=\"LeanCanvas\">\n# Lean Canvas\n- Problem: X\n- Solution: Y\n</document>\nNội dung sau.";

        // Act
        var docs = TagParserHelper.ExtractDocuments(input);

        // Assert
        Assert.Single(docs);
        Assert.Equal("LeanCanvas", docs[0].Type);
        Assert.Contains("# Lean Canvas", docs[0].Content);
    }

    [Fact]
    public void StripTags_ShouldRemoveAllSpecialTags()
    {
        // Arrange
        var input = "Chào bạn!\n<idea_summary>Tóm tắt ngắn</idea_summary>\n<document type=\"SWOT\"># SWOT</document>\nHy vọng giúp ích được!";

        // Act
        var cleaned = TagParserHelper.StripTags(input);

        // Assert
        Assert.DoesNotContain("<idea_summary>", cleaned);
        Assert.DoesNotContain("<document", cleaned);
        Assert.Contains("Chào bạn!", cleaned);
        Assert.Contains("Hy vọng giúp ích được!", cleaned);
    }
}
