using System.Text.RegularExpressions;

namespace AIStartupCoach.API.Helpers;

public class ExtractedDocument
{
    public string Type { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
}

public static class TagParserHelper
{
    private static readonly Regex IdeaSummaryRegex = new(@"<idea_summary>(.*?)</idea_summary>", RegexOptions.Singleline | RegexOptions.Compiled);
    private static readonly Regex DocumentRegex = new(@"<document\s+type=""(.*?)""\s*>(.*?)</document>", RegexOptions.Singleline | RegexOptions.Compiled);

    public static string? ExtractIdeaSummary(string text)
    {
        if (string.IsNullOrWhiteSpace(text)) return null;

        var match = IdeaSummaryRegex.Match(text);
        return match.Success ? match.Groups[1].Value.Trim() : null;
    }

    public static List<ExtractedDocument> ExtractDocuments(string text)
    {
        var result = new List<ExtractedDocument>();
        if (string.IsNullOrWhiteSpace(text)) return result;

        var matches = DocumentRegex.Matches(text);
        foreach (Match match in matches)
        {
            if (match.Success)
            {
                result.Add(new ExtractedDocument
                {
                    Type = match.Groups[1].Value.Trim(),
                    Content = match.Groups[2].Value.Trim()
                });
            }
        }

        return result;
    }

    public static string StripTags(string text)
    {
        if (string.IsNullOrWhiteSpace(text)) return text;

        var cleaned = IdeaSummaryRegex.Replace(text, string.Empty);
        cleaned = DocumentRegex.Replace(cleaned, string.Empty);
        return cleaned.Trim();
    }
}
