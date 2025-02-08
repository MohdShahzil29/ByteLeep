public class Main {
    public String longestCommonPrefix(String[] strs) {
        if (strs == null || strs.length == 0) {
            return "";
        }

        String prefix = strs[0];

        for (int i = 1; i < strs.length; i++) {
            while (!strs[i].startsWith(prefix)) {
                prefix = prefix.substring(0, prefix.length() - 1);
                if (prefix.isEmpty()) {
                    return "";
                }
            }
        }
        return prefix;
    }

    public static void main(String[] args) {
        Main solution = new Main();

        String[] input1 = {"flower", "flow", "flight"};
        System.out.println("Output: " + solution.longestCommonPrefix(input1)); // Expected: "fl"

        String[] input2 = {"dog", "racecar", "car"};
        System.out.println("Output: " + solution.longestCommonPrefix(input2)); // Expected: ""

        String[] input3 = {"interspecies", "interstellar", "interstate"};
        System.out.println("Output: " + solution.longestCommonPrefix(input3)); // Expected: "inters"
    }
}
