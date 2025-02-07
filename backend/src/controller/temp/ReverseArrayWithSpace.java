public class ReverseArrayWithSpace {
    public static void main(String[] args) {
        // Example arrays
        int[] arr1 = {1, 4, 3, 2, 6, 5};
        int[] arr2 = {8, 6, 5, 3, 5};

        // Reverse the arrays
        int[] reversedArr1 = reverseArray(arr1);
        int[] reversedArr2 = reverseArray(arr2);

        // Print the reversed arrays
        System.out.println("Reversed arr1:");
        printArray(reversedArr1);

        System.out.println("Reversed arr2:");
        printArray(reversedArr2);
    }

    // Method to reverse an array using additional space
    public static int[] reverseArray(int[] arr) {
        int n = arr.length;
        int[] reversed = new int[n]; // Additional space

        for (int i = 0; i < n; i++) {
            reversed[i] = arr[n - 1 - i];
        }

        return reversed;
    }

    // Method to print an array
    public static void printArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}
